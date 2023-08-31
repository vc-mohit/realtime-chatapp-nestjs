import { CommonResponse } from 'src/common/type/common-response.types';

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
