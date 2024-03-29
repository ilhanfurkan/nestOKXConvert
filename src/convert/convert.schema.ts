import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ConvertHistoryState, SideType } from './convert.abstract';

@Schema()
export class ConvertRequest {
  @Prop()
  _id: string;

  @Prop()
  customerId: string;

  @Prop()
  subAccount: string;

  @Prop()
  tradeId: string;

  @Prop()
  quoteId: string;

  @Prop()
  clTReqId: string;

  @Prop({ type: String, enum: ConvertHistoryState })
  state: ConvertHistoryState;

  @Prop()
  instId: string;

  @Prop()
  baseCcy: string;

  @Prop()
  quoteCcy: string;

  @Prop({ type: String, enum: SideType })
  side: SideType;

  @Prop()
  fillPx: string;

  @Prop()
  fillBaseSz: string;

  @Prop()
  fillQuoteSz: string;

  @Prop()
  ts: string;
}

export const ConvertRequestSchema =
  SchemaFactory.createForClass(ConvertRequest);
