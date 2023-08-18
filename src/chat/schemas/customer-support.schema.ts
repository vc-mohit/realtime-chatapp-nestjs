import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'customersupport' })
export class CustomerSupport {
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  customerSupportName: String;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  customerSupportEmail: String;

  @Prop({
    type: SchemaTypes.Boolean,
    default: true,
    required: true,
  })
  isAvailable: Boolean;
}

export const adminSchema = SchemaFactory.createForClass(CustomerSupport);
export type AdminDocument = HydratedDocument<CustomerSupport>;
