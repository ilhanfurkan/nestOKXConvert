import { Injectable } from '@nestjs/common';
import { OkxConvertService } from 'okx-api-connect/services/convertService';
import {
  GetConvertCurrencyPairResponse,
  PostConvertEstimateQuoteResponse,
  PostConvertTradeResponse,
} from 'okx-api-connect/types/responses';
import { ApiConfiguration } from 'okx-api-connect/types/types';
import {
  ConvertEstimateQuoteModel,
  ConvertPairModel,
  ConvertTradeModel,
} from './convert.model';
import { CustomOkxResponse } from 'src/utils/abstract';
import { CustomError } from 'src/utils/error/customError';

@Injectable()
export class ConvertService {
  _init(): void {}
  apiConfiguration: ApiConfiguration;
  constructor(apiConfiguration: ApiConfiguration) {
    this.apiConfiguration = apiConfiguration;
  }

  async convertCurrencyPair(
    body: ConvertPairModel,
  ): Promise<GetConvertCurrencyPairResponse[]> {
    return await new OkxConvertService(this.apiConfiguration)
      .getConvertCurrencyPair(body)
      .then((response: CustomOkxResponse<GetConvertCurrencyPairResponse>) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new CustomError(response.message, response.code, response.status);
      })
      .catch((err) => {
        throw new CustomError(err.message, err.code, err.status);
      });
  }

  async convertEstimateQuote(
    body: ConvertEstimateQuoteModel,
  ): Promise<PostConvertEstimateQuoteResponse[]> {
    return await new OkxConvertService(this.apiConfiguration)
      .postConvertEstimateQuote(body)
      .then((response: CustomOkxResponse<PostConvertEstimateQuoteResponse>) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new CustomError(response.message, response.code, response.status);
      })
      .catch((err) => {
        throw new CustomError(err.message, err.code, err.status);
      });
  }

  async convertTrade(
    body: ConvertTradeModel,
  ): Promise<PostConvertTradeResponse[]> {
    return await new OkxConvertService(this.apiConfiguration)
      .postConvertTrade(body)
      .then((response: CustomOkxResponse<PostConvertTradeResponse>) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new CustomError(response.message, response.code, response.status);
      })
      .catch((err) => {
        throw new CustomError(err.message, err.code, err.status);
      });
  }
}
