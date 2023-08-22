import { ConfigService } from '@nestjs/config';
export const getRedisConfiguration = (configService: ConfigService) => {
  
    const redisUrl = configService.get('REDIS_URL');
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
    host: configService.get<string>('database.host'),
    port: Number(configService.get<string>('redis.port')),
  };
};
