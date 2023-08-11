import { Controller, Post, Body, Get, Render } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  @Render('index')
  getChatPage() {
    return { message: 'Chat App' };
  }

  @Post('send-message')
  sendMessage(@Body() data: { username: string; message: string }) {
    this.chatService.sendMessage(data);
  }

  handleConnection(socket: Socket) {
    this.chatService.handleConnection(socket);
  }
}
