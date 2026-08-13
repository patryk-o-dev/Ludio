import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on('error', (err: Error) => console.log('Redis Client Error', err));

const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
};

const disconnectRedis = async () => {
  if (client.isOpen) {
    await client.disconnect();
  }
};

export { client, connectRedis, disconnectRedis };
