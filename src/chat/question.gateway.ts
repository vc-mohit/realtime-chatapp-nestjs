import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Question, QuestionDocument } from './schemas/question.schema';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class QuestionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    console.log(`User connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`User disconnected: ${client.id}`);
  }

  @SubscribeMessage('getAllQuestions')
  async getAllQuestions(client: Socket, data: any) {
    try {
      const questions = await this.questionModel.find().exec();
      client.emit('allQuestions', questions);
    } catch (error) {
      client.emit('error', error.message);
    }
  }
}
