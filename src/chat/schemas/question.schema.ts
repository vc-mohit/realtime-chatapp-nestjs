import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, SchemaTypes, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, collection: 'questions' })
export class Question {
  _id: Types.ObjectId;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  question: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  answer: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
export type QuestionDocument = HydratedDocument<Question>;
