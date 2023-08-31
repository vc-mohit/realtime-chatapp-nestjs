import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Socket } from 'socket.io';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

const ROOM_MAX_CAPACITY = 2;

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}
  private roomsState: { id: string; users: number }[] = [];

  // send message****
  async handleConnection(socket: Socket) {
    const roomID = await this.joinRoom();

    socket.join(roomID);

    socket.on('send-message', async (message: string) => {
      const newMessage = new this.chatModel({
        roomId: roomID,
        sender: socket.id,
        message: message,
      });
      await newMessage.save();

      socket.to(roomID).emit('receive-message', newMessage);
    });

    socket.on('disconnect', () => {
      this.leaveRoom(roomID);
    });
  }

  private async joinRoom(): Promise<string> {
    for (let i = 0; i < this.roomsState.length; i++) {
      if (this.roomsState[i].users < ROOM_MAX_CAPACITY) {
        this.roomsState[i].users++;
        return this.roomsState[i].id;
      }
    }

    const newID = uuidv4();
    this.roomsState.push({
      id: newID,
      users: 1,
    });
    return newID;
  }

  private leaveRoom(id: string): void {
    this.roomsState = this.roomsState.filter((room) => {
      if (room.id === id) {
        if (room.users === 1) {
          return false;
        } else {
          room.users--;
        }
      }
      return true;
    });
  }
}
