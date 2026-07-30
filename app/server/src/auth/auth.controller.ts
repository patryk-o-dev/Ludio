import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('twitch/url')
  getTwitchAuthUrl() {
    return this.authService.createTwitchAuthUrl();
  }

  @Get('twitch/callback')
  async handleTwitchCallback(
    @Query('code') code: string | undefined,
    @Query('state') state: string | undefined,
    @Query('error') error: string | undefined,
    @Query('error_description') errorDescription: string | undefined,
    @Res() res: Response,
  ) {
    if (error) {
      return res.redirect(
        this.authService.buildFrontendErrorRedirect(errorDescription ?? error),
      );
    }

    try {
      const { user, sessionId } = await this.authService.handleTwitchCallback(
        code,
        state,
      );

      res.cookie('sessionId', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      return res.redirect(this.authService.buildFrontendSuccessRedirect(user));
    } catch (callbackError) {
      const message =
        callbackError instanceof Error
          ? callbackError.message
          : 'Twitch login failed';

      return res.redirect(this.authService.buildFrontendErrorRedirect(message));
    }
  }
}
