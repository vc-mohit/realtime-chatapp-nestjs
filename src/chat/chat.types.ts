import { CommonResponse } from 'src/common/types/common-response.types';
import { Types } from 'mongoose';
import { Question, QuestionDocument } from './schemas/question.schema';

// export interface Question {
//   _id: Types.ObjectId;
//   question: string;
//   answer: string;
// }

export interface sendMessage {
  senderEmail: string;
  receiverEmail: string;
  message: string;
  image: string;
}

export interface CreateRoom {
  userName: string;
  userEmail: string;
  adminEmail: string;
  customerSupportEmail: string;
}

export type sendMessageModel = Promise<CommonResponse<sendMessage>>;
export type CreateRoomModel = Promise<CommonResponse<CreateRoom>>;
export type questionsModel = Promise<
  CommonResponse<QuestionDocument[] | QuestionDocument>
>;
