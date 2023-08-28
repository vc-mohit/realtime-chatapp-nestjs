import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class CustomerAssistant {
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  customerAssistantName: String;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  customerAssistantEmail: String;

  @Prop({
    type: SchemaTypes.Boolean,
    default: true,
    required: true,
  })
  isAvailable: Boolean;
}

export const customerAssistantSchema =
  SchemaFactory.createForClass(CustomerAssistant);
export type customerAssistantDocument = HydratedDocument<CustomerAssistant>;
