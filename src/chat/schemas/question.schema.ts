import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'questions' })
export class Question {}

export const chatSchema = SchemaFactory.createForClass(Question);
export type ChatDocument = HydratedDocument<Question>;
