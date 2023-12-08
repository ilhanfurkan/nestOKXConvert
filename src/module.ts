import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppMiddleware } from './middleware';
import { ConfigModule } from '@nestjs/config';
import { ConvertModule } from './convert/convert.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ConvertModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
