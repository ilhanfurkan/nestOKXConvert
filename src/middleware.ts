import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ExceptionMessages } from './utils/error/exceptionMessages';
import { CustomResponse } from './utils/response/response';
import { createClient } from 'redis';
import { RedisSession } from './utils/abstract';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.headers.authorization) {
        throw ExceptionMessages.InvalidToken;
      }

      const token = req.headers.authorization.split(' ')[1];

      const client = createClient({
        url: process.env.REDIS_URI,
      });
      client.connect();

      const redisSession: RedisSession = await this.getRedisSession(
        token,
        client,
      );

      if (!redisSession) {
        throw ExceptionMessages.InvalidToken;
      }

      const apiConfiguration = JSON.parse(redisSession.apiConfiguration);
      const authorizedUser = JSON.parse(redisSession.user);

      req['apiConfiguration'] = apiConfiguration;
      req['authorizedUser'] = authorizedUser;

      next();
    } catch (error) {
      new CustomResponse().errorResponse(res, error);
    }
  }

  private async getRedisSession(
    token: string,
    client: ReturnType<typeof createClient>,
  ): Promise<RedisSession> {
    const sessionKeys = await client.sMembers('redis_session');

    if (sessionKeys && sessionKeys.length > 0) {
      const isTokenValid = sessionKeys.includes(token);

      if (isTokenValid) {
        const sessionData = await client.hGetAll(`redis_session:${token}`);
        return sessionData ? JSON.parse(JSON.stringify(sessionData)) : null;
      }
    }

    return null;
  }
}
