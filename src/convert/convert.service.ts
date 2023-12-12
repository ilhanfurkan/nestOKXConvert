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
import { AuthorizedUser, CustomOkxResponse } from 'src/utils/abstract';
import { CustomError } from 'src/utils/error/customError';
import { ConvertRequest } from './convert.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ConvertService {
  _init(): void {}
  constructor(
    @InjectModel(ConvertRequest.name)
    private convertModel: Model<ConvertRequest>,
  ) {
    this.convertModel = convertModel;
  }

  async convertCurrencyPair(
    body: ConvertPairModel,
    apiConfiguration: ApiConfiguration,
  ): Promise<GetConvertCurrencyPairResponse[]> {
    return await new OkxConvertService(apiConfiguration)
      .getConvertCurrencyPair(body)
      .then((response: CustomOkxResponse<GetConvertCurrencyPairResponse>) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new CustomError(response.message, response.code, response.status);
      })
      .catch((err) => {
        throw new CustomError(err.message, err.code, err.httpStatus);
      });
  }

  async convertEstimateQuote(
    body: ConvertEstimateQuoteModel,
    apiConfiguration: ApiConfiguration,
  ): Promise<PostConvertEstimateQuoteResponse[]> {
    return await new OkxConvertService(apiConfiguration)
      .postConvertEstimateQuote(body)
      .then((response: CustomOkxResponse<PostConvertEstimateQuoteResponse>) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new CustomError(response.message, response.code, response.status);
      })
      .catch((err) => {
        throw new CustomError(err.message, err.code, err.httpStatus);
      });
  }

  async convertTrade(
    body: ConvertTradeModel,
    apiConfiguration: ApiConfiguration,
    authorizedUser: AuthorizedUser,
  ): Promise<PostConvertTradeResponse[]> {
    const convertRequest: PostConvertTradeResponse[] =
      await new OkxConvertService(apiConfiguration)
        .postConvertTrade(body)
        .then((response: CustomOkxResponse<PostConvertTradeResponse>) => {
          if (response.status === 200) {
            return response.data;
          }
          throw new CustomError(
            response.message,
            response.code,
            response.status,
          );
        })
        .catch((err) => {
          throw new CustomError(err.message, err.code, err.httpStatus);
        });

    let updatedData = convertRequest.map((item) => {
      return {
        _id: item.tradeId,
        customerId: authorizedUser.id,
        subAccount: authorizedUser.subAccount,
        ...item,
      };
    });

    await this.convertModel.create(updatedData);

    const document: ConvertRequest = await this.convertModel.findOne({
      _id: convertRequest[0].tradeId,
    });

    return [document];
  }
}
