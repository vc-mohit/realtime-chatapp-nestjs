import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'chats' })
export class Chat {
  _id: Types.ObjectId;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  roomId: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  userName: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  userEmail: string;

  @Prop({
    type: SchemaTypes.String,
    ref: 'CustomerSupport',
    required: true,
  })
  customerEmail: string;

  @Prop({
    type: [
      {
        senderEmail: { type: String },
        receiverEmail: { type: String },
        image: { type: String },
        message: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  })
  messages?: [
    {
      senderEmail: string;
      receiverEmail: string;
      message: string;
      image: String;
      createdAt: string;
    },
  ];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
export type ChatDocument = HydratedDocument<Chat>;
