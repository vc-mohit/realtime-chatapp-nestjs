import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
}
