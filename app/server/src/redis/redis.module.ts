import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import Redlock from 'redlock';
import { client } from '../redis';

export const REDLOCK = 'REDLOCK';

@Module({
  providers: [
    RedisService,
    {
      provide: REDLOCK,
      useFactory: () =>
        new Redlock([client as any], { retryCount: 3, retryDelay: 200 }),
    },
  ],
  exports: [RedisService, REDLOCK],
})
export class RedisModule {}
