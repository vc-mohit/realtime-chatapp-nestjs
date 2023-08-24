import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'admin' })
export class Admin {
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  adminName: String;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  adminEmail: String;
}

export const adminSchema = SchemaFactory.createForClass(Admin);
export type AdminDocument = HydratedDocument<Admin>;
