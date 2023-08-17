import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'chats' })
export class Chat {
  _id: Types.ObjectId;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  userEmail: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  adminEmail: string;

  @Prop({
    type: [
      {
        senderEmail: { type: String },
        receiverEmail: { type: String },
        message: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  })
  messages: [
    {
      senderEmail: { type: String };
      receiverEmail: { type: String };
      message: { type: String };
    },
  ];
}

export const chatSchema = SchemaFactory.createForClass(Chat);
export type ChatDocument = HydratedDocument<Chat>;
