import { Body, Post, Controller, Res } from '@nestjs/common';
import { ConvertService } from './convert.service';
import { Response } from 'express';
import { CustomResponse } from 'src/utils/response/response';
import {
  GetConvertCurrencyPairResponse,
  PostConvertEstimateQuoteResponse,
  PostConvertTradeResponse,
} from 'okx-api-connect/types/responses';
import {
  ConvertEstimateQuoteModel,
  ConvertPairModel,
  ConvertTradeModel,
} from './convert.model';

@Controller('api/convert/')
export class ConvertController {
  private readonly response: CustomResponse;
  constructor(private readonly convertService: ConvertService) {
    convertService._init();
    this.response = new CustomResponse();
  }

  @Post('currency-pair')
  async convertCurrencyPair(
    @Res() res: Response,
    @Body() body: ConvertPairModel,
  ): Promise<Response> {
    return await this.convertService
      .convertCurrencyPair(body)
      .then((currencyPairResponse) => {
        return this.response.successResponse<GetConvertCurrencyPairResponse[]>(
          res,
          currencyPairResponse,
        );
      })
      .catch((err) => {
        return this.response.errorResponse(res, err);
      });
  }

  @Post('estimate-quote')
  async convertEstimateQuote(
    @Res() res: Response,
    @Body() body: ConvertEstimateQuoteModel,
  ): Promise<Response> {
    return await this.convertService
      .convertEstimateQuote(body)
      .then((estimateQuoteResponse) => {
        return this.response.successResponse<
          PostConvertEstimateQuoteResponse[]
        >(res, estimateQuoteResponse);
      })
      .catch((err) => {
        return this.response.errorResponse(res, err);
      });
  }

  @Post('trade')
  async convertTrade(
    @Res() res: Response,
    @Body() body: ConvertTradeModel,
  ): Promise<Response> {
    return await this.convertService
      .convertTrade(body)
      .then((tradeResponse) => {
        return this.response.successResponse<PostConvertTradeResponse[]>(
          res,
          tradeResponse,
        );
      })
      .catch((err) => {
        return this.response.errorResponse(res, err);
      });
  }
}
