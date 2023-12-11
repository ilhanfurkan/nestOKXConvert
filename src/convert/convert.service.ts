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

  apiConfiguration: ApiConfiguration = {
    apiKey: '328f1b3a-ade9-47e1-a90e-48c534884bc8',
    passphrase: 'G67O!b#AbOsT530C3e8FBg6g',
    secretKey: '6E9D31BA87D0265F444D68E9B7C3DEB1',
  };

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
    const convertRequest: PostConvertTradeResponse[] =
      await new OkxConvertService(this.apiConfiguration)
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
          throw new CustomError(err.message, err.code, err.status);
        });

    let updatedData = convertRequest.map((item) => {
      return {
        _id: item.tradeId,
        ...item,
      };
    });

    this.convertModel.create(updatedData);

    let document: ConvertRequest = await this.convertModel.findOne({
      _id: convertRequest[0].tradeId,
    });

    return this.convertModel.find(document);
  }
}
