import { Controller, Post, Body, Get, Render, Param } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto, CreateRoomDto } from './dto/create-chat.dto';
import {
  CreateRoomModel,
  questionsModel,
  sendMessageModel,
} from './chat.types';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send-message')
  async sendMessage(@Body() createChatDto: CreateChatDto): sendMessageModel {
    // const userEmail = data.username;
    return this.chatService.sendMessage(createChatDto);

    // await this.chatService.sendMessage({
    //   username: userEmail,
    //   message: data.message,
    // });
  }

  handleConnection(socket: Socket) {
    this.chatService.handleConnection(socket);
  }

  //create room
  @Post('room')
  async createRoom(@Body() createRoomDto: CreateRoomDto): CreateRoomModel {
    return this.chatService.createRoom(createRoomDto);
  }

  @Get('questions')
  async getAllQuestions(): questionsModel {
    return this.chatService.getAllQuestions();
  }
}
