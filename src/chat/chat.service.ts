import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chat, ChatDocument } from './schemas/chat.schema';
@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async createUserAndRoom(
    userName?: string,
    userEmail?: string,
    customerEmail?: string,
  ): Promise<ChatDocument> {
    const newChat = new this.chatModel({
      roomId: generateRoomId(),
      userName,
      userEmail,
      customerEmail,
      messages: [],
    });

    return newChat.save();
  }

  async saveMessage(
    _id: Types.ObjectId,
    message: any,
  ): Promise<ChatDocument | null> {
    const chat = await this.chatModel.findById(_id);

    if (!chat) {
      return null;
    }

    chat.messages.push({
      senderEmail: message.senderEmail,
      receiverEmail: message.receiverEmail,
      message: message.message,
      image: message.image || '',
      createdAt: new Date().toISOString(),
    });

    return chat.save();
  }

  async leaveRoom(chatId: Types.ObjectId): Promise<void> {
    await this.chatModel.deleteOne({ _id: chatId });
  }
}

// Generate a random room ID (You can use UUID or any other method)
function generateRoomId(): string {
  return 'room_' + Math.random().toString(36).substr(2, 9);
}
