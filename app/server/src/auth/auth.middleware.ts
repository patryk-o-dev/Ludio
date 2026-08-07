import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly redisService: RedisService) {}

  async use(req: Request, res: Response, next: NextFunction) {
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

    req.user = {
      id: session.userId,
    };

    await this.redisService.expire(
      `auth:session:${sessionId}`,
      60 * 60 * 24 * 7,
    );

    next();
  }
}
