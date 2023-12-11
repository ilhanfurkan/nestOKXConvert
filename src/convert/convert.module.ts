import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConvertController } from './convert.controller';
import { ConvertService } from './convert.service';
import { ConvertMiddleware } from './convert.middleware';
import { ConvertRequest, ConvertRequestSchema } from './convert.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ConvertRequest.name, schema: ConvertRequestSchema },
    ]),
  ],
  controllers: [ConvertController],
  providers: [ConvertService],
})
export class ConvertModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ConvertMiddleware).forRoutes(ConvertController);
  }
}
