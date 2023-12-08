import { IsEnum, IsString } from 'class-validator';
import { SideType } from './convert.abstract';

export class ConvertPairModel {
  @IsString()
  fromCcy: string;

  @IsString()
  toCcy: string;
}

export class ConvertEstimateQuoteModel {
  @IsString()
  baseCcy: string;

  @IsString()
  quoteCcy: string;

  @IsString()
  @IsEnum(SideType)
  side: SideType;

  @IsString()
  rfqSz: string;

  @IsString()
  rfqSzCcy: string;

  @IsString()
  clQReqId?: string;

  @IsString()
  tag?: string;
}

export class ConvertTradeModel {
  @IsString()
  quoteId: string;

  @IsString()
  baseCcy: string;

  @IsString()
  quoteCcy: string;

  @IsString()
  @IsEnum(SideType)
  side: SideType;

  @IsString()
  sz: string;

  @IsString()
  szCcy: string;

  @IsString()
  clTReqId?: string;

  @IsString()
  tag?: string;
}
