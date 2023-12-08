import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConvertController } from './convert.controller';
import { ConvertService } from './convert.service';
import { ConvertMiddleware } from './convert.middleware';

@Module({
  imports: [],
  controllers: [ConvertController],
  providers: [ConvertService],
})
export class ConvertModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ConvertMiddleware).forRoutes(ConvertController);
  }
}
