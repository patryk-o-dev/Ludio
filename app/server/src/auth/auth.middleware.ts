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

    if (session) {
      req.user = {
        id: session.userId,
      };
    }

    next();
  }
}
