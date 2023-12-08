import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ConvertMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.info({
      Type: 'ConvertMiddleware',
      URL: req.url,
      Params: req.params,
    });

    next();
  }
}
