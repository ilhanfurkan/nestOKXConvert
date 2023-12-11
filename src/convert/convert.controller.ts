import { Body, Post, Controller, Res, Req } from '@nestjs/common';
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

@Controller('api/convert')
export class ConvertController {
  private readonly response: CustomResponse;
  constructor(private readonly convertService: ConvertService) {
    convertService._init();
    this.response = new CustomResponse();
  }

  @Post('currency-pair')
  async convertCurrencyPair(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: ConvertPairModel,
  ): Promise<Response> {
    const apiConfiguration = req['apiConfiguration'];

    return await this.convertService
      .convertCurrencyPair(body, apiConfiguration)
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
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: ConvertEstimateQuoteModel,
  ): Promise<Response> {
    const apiConfiguration = req['apiConfiguration'];

    return await this.convertService
      .convertEstimateQuote(body, apiConfiguration)
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
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: ConvertTradeModel,
  ): Promise<Response> {
    const authorizedUser = req['authorizedUser'];
    const apiConfiguration = req['apiConfiguration'];
    return await this.convertService
      .convertTrade(body, apiConfiguration, authorizedUser)
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
