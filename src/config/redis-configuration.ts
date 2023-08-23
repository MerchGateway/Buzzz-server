import { ConfigObject } from '@nestjs/config';

export const getRedisConfiguration = (config: ConfigObject) => {
  const redisUrl = config.redis.redis_url;
  console.log(redisUrl);
  if (redisUrl) {
    const parsedUrl = new URL(redisUrl);

    return {
      host: parsedUrl.hostname,
      password: parsedUrl.password,
      port: Number(parsedUrl.port),
    };
  }

  return {
    host: config.database.host,
    port: config.redis.port,
  };
};
