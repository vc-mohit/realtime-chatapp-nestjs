import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'chats' })
export class Chat {
  _id: Types.ObjectId;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  sender: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  receiver: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  message: string;
}

export const chatSchema = SchemaFactory.createForClass(Chat);
export type ChatDocument = HydratedDocument<Chat>;
