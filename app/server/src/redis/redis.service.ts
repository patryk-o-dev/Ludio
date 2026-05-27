import { Injectable } from '@nestjs/common';
import { client } from '../redis';

@Injectable()
export class RedisService {
  async get(key: string): Promise<string | null> {
    const value = await client.get(key);
    return value ? value.toString() : null;
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await client.set(key, value, { EX: ttlSeconds });
    } else {
      await client.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await client.del(key);
  }

  async getJson<T>(key: string): Promise<T | null> {
    const data = await client.get(key);
    return data ? (JSON.parse(data.toString()) as T) : null;
  }

  async setJson<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    await this.set(key, JSON.stringify(value), ttlSeconds);
  }
}
