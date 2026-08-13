import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { getFrontendOrigin } from '@/config/frontend-origin';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

const TWITCH_STATE_TTL_SECONDS = 60 * 10;

type StoredTwitchState = {
  status: 'pending';
  createdAt: number;
};

type TwitchTokenResponse = {
  access_token?: string;
  message?: string;
};

type TwitchUserPayload = {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
};

type TwitchUsersResponse = {
  data?: TwitchUserPayload[];
  message?: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisService,
    private readonly prisma: PrismaService,
  ) {}

  private getTwitchStateKey(state: string) {
    return `auth:twitch:state:${state}`;
  }

  private getFrontendOrigin() {
    try {
      return getFrontendOrigin();
    } catch {
      throw new InternalServerErrorException(
        'FRONTEND_ORIGIN is not configured',
      );
    }
  }

  private getTwitchRedirectUri() {
    return (
      process.env.TWITCH_REDIRECT_URI ??
      'http://localhost:3000/api/auth/twitch/callback'
    );
  }

  private getTwitchScope() {
    return process.env.TWITCH_SCOPE ?? '';
  }

  private buildFrontendCallbackUrl(params: Record<string, string>) {
    const url = new URL('/auth/twitch/callback', this.getFrontendOrigin());

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      }
    });

    return url.toString();
  }

  private async exchangeCodeForToken(code: string) {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new InternalServerErrorException(
        'Twitch OAuth credentials are not configured',
      );
    }

    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: this.getTwitchRedirectUri(),
    });

    const response = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = (await response.json()) as TwitchTokenResponse;

    if (!response.ok || !data.access_token) {
      throw new UnauthorizedException(
        data.message ?? 'Failed to exchange Twitch authorization code',
      );
    }

    return data.access_token;
  }

  private async fetchTwitchUser(accessToken: string) {
    const clientId = process.env.TWITCH_CLIENT_ID;

    if (!clientId) {
      throw new InternalServerErrorException(
        'TWITCH_CLIENT_ID is not configured',
      );
    }

    const response = await fetch('https://api.twitch.tv/helix/users', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-Id': clientId,
      },
    });

    const data = (await response.json()) as TwitchUsersResponse;
    const user = data.data?.[0];

    if (!response.ok || !user) {
      throw new UnauthorizedException(
        data.message ?? 'Failed to fetch Twitch user profile',
      );
    }

    return user;
  }

  async createTwitchAuthUrl() {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const redirectUri = this.getTwitchRedirectUri();
    const scope = this.getTwitchScope();

    if (!clientId) {
      throw new InternalServerErrorException(
        'TWITCH_CLIENT_ID is not configured',
      );
    }

    const state = randomUUID();

    await this.redisService.setJson<StoredTwitchState>(
      this.getTwitchStateKey(state),
      {
        status: 'pending',
        createdAt: Date.now(),
      },
      TWITCH_STATE_TTL_SECONDS,
    );

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      state,
    });

    if (scope.trim()) {
      params.set('scope', scope);
    }

    return {
      url: `https://id.twitch.tv/oauth2/authorize?${params.toString()}`,
      state,
      expiresInSeconds: TWITCH_STATE_TTL_SECONDS,
    };
  }

  async handleTwitchCallback(code?: string, state?: string) {
    if (!code || !state) {
      throw new BadRequestException('Missing Twitch callback parameters');
    }

    const storedState = await this.redisService.getJson<StoredTwitchState>(
      this.getTwitchStateKey(state),
    );

    if (!storedState || storedState.status !== 'pending') {
      throw new UnauthorizedException('Invalid or expired Twitch state');
    }

    await this.redisService.del(this.getTwitchStateKey(state));

    const accessToken = await this.exchangeCodeForToken(code);
    const twitchUser = await this.fetchTwitchUser(accessToken);

    const user = await this.prisma.user.upsert({
      where: { twitchId: twitchUser.id },
      update: {
        username: twitchUser.login,
        displayName: twitchUser.display_name,
        avatarUrl: twitchUser.profile_image_url,
      },
      create: {
        username: twitchUser.login,
        twitchId: twitchUser.id,
        displayName: twitchUser.display_name,
        avatarUrl: twitchUser.profile_image_url,
      },
    });

    const sessionId = randomUUID();

    await this.redisService.setJson(
      `auth:session:${sessionId}`,
      {
        userId: user.id,
      },
      60 * 60 * 24 * 7,
    );

    return {
      user,
      sessionId,
    };
  }

  buildFrontendSuccessRedirect(user: {
    id: string;
    username: string;
    twitchId: string | null;
    displayName: string | null;
    avatarUrl: string | null;
  }) {
    return this.buildFrontendCallbackUrl({
      status: 'success',
      userId: user.id,
      username: user.username,
      twitchId: user.twitchId ?? '',
      displayName: user.displayName ?? '',
      avatarUrl: user.avatarUrl ?? '',
    });
  }

  buildFrontendErrorRedirect(message: string) {
    return this.buildFrontendCallbackUrl({
      status: 'error',
      message,
    });
  }
}
