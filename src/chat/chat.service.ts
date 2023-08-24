import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';
import { Chat, ChatDocument } from './schemas/chat.schema';
import { CreateChatDto, CreateRoomDto } from './dto/create-chat.dto';
import { ResponseHandler } from 'src/utils/response-handler';
import { Question, QuestionDocument } from './schemas/question.schema';
import {
  CreateRoomModel,
  questionsModel,
  sendMessageModel,
} from './chat.types';

@Injectable()
export class ChatService {
  private connectedSockets: Socket[] = [];

  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>,
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
  ) {}

  async handleConnection(socket: Socket) {
    this.connectedSockets.push(socket);

    // send message****
    socket.on(
      'send message',
      async ({ senderEmail, message, roomId, receiverEmail }) => {
        const chat = await this.chatModel.findOne({
          _id: roomId,
        });

        const newMessage = {
          senderEmail: senderEmail,
          receiverEmail: receiverEmail,
          message,
          image: '',
          createdAt: new Date().toISOString(),
        };

        chat.messages.push(newMessage);
        await chat.save();

        const formattedMessage = `${newMessage}`;
        this.connectedSockets.forEach((connectedSocket) => {
          connectedSocket.emit('receive message', formattedMessage);
        });
      },
    );

    // for create room ****
    socket.on(
      'create room',
      async ({ username, userEmail, adminEmail, customerSupportEmail }) => {
        const newRoom = new this.chatModel({
          username,
          userEmail,
          adminEmail,
          customerSupportEmail,
        });

        await newRoom.save();

        const formattedMessage = `${newRoom}`;
        this.connectedSockets.forEach((connectedSocket) => {
          connectedSocket.emit('receive message', formattedMessage);
        });
      },
    );

    //getmsg
    socket.on('questions', async () => {
      const questions = await this.questionModel.find().exec();
      socket.emit('output-messages', questions);
    });
  }

  //sendMsg
  async sendMessage(createChatDto: CreateChatDto): sendMessageModel {
    const { roomId, senderEmail, receiverEmail, image, message } =
      createChatDto;

    const chat = await this.chatModel.findOne({
      _id: roomId,
    });

    const newMessage = {
      senderEmail: senderEmail,
      receiverEmail: receiverEmail,
      message,
      image,
      createdAt: new Date().toISOString(),
    };

    chat.messages.push(newMessage);
    await chat.save();

    return ResponseHandler.success(
      newMessage,
      'Room created successfully',
      HttpStatus.OK,
    );
  }

  // create room
  async createRoom(createRoomDto: CreateRoomDto): CreateRoomModel {
    const { userName, userEmail, adminEmail, customerSupportEmail } =
      createRoomDto;

    const newRoom = new this.chatModel({
      userName,
      userEmail,
      adminEmail,
      customerSupportEmail,
    });

    await newRoom.save();
    return ResponseHandler.success(
      newRoom,
      'Room created successfully',
      HttpStatus.OK,
    );
  }
  // getAllMessage

  async getAllQuestions(): questionsModel {
    const questions = await this.questionModel.find().exec();
    console.log('-------------------------------------', questions);

    return ResponseHandler.success(questions, 'success', HttpStatus.OK);
  }
}
