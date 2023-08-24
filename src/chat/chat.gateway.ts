import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Chat, ChatDocument } from './schemas/chat.schema';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`User connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`User disconnected: ${client.id}`);
  }

  @SubscribeMessage('send message')
  async handleMessage(client: Socket, payload: any) {
    const { roomId, senderEmail, receiverEmail, message, image } = payload;

    const chat = await this.chatModel.findOne({ _id: roomId });

    const newMessage = {
      senderEmail: senderEmail,
      receiverEmail: receiverEmail,
      message,
      image,
      createdAt: new Date().toISOString(),
    };

    chat.messages.push(newMessage);
    await chat.save();

    this.server.to(client.id).emit('receive message', newMessage);
  }
}
