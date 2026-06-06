import { Injectable } from '@nestjs/common';
import { client } from '../redis';

@Injectable()
export class RedisService {
  async get(key: string): Promise<string | null> {
    const value = await client.get(key);
    return value ? value.toString() : null;
  }

  async setIfAbsent(
    key: string,
    value: string,
    ttlSeconds?: number,
  ): Promise<boolean> {
    const result = ttlSeconds
      ? await client.set(key, value, { NX: true, EX: ttlSeconds })
      : await client.set(key, value, { NX: true });

    return result === 'OK';
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

  async delIfEqual(key: string, expectedValue: string): Promise<boolean> {
    const currentValue = await this.get(key);
    if (currentValue !== expectedValue) {
      return false;
    }

    await this.del(key);
    return true;
  }

  async getJson<T>(key: string): Promise<T | null> {
    const data = await client.get(key);
    return data ? (JSON.parse(data.toString()) as T) : null;
  }

  async setJson<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    await this.set(key, JSON.stringify(value), ttlSeconds);
  }
}
