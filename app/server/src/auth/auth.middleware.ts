import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedisService } from '../redis/redis.service';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly redisService: RedisService,
    private readonly prisma: PrismaService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionId = req.cookies.sessionId;

      if (!sessionId) {
        return next();
      }

      const session = await this.redisService.getJson<{ userId: string }>(
        `auth:session:${sessionId}`,
      );

      if (!session) {
        res.clearCookie('sessionId');
        return next();
      }

      const user = await this.prisma.user.findUnique({
        where: { id: session.userId },
        select: {
          id: true,
          username: true,
          twitchId: true,
          displayName: true,
          avatarUrl: true,
          allowFriendRequests: true,
        },
      });

      if (!user) {
        res.clearCookie('sessionId');
        return next();
      }

      req.user = user;

      await this.redisService.expire(
        `auth:session:${sessionId}`,
        60 * 60 * 24 * 7,
      );

      return next();
    } catch (error) {
      return next(error);
    }
  }
}
