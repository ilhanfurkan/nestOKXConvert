import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.info({
      Type: 'AppMiddleware',
      URL: req.url,
      Params: req.headers.authorization,
    });

    next();
  }
}
