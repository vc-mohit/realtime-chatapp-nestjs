import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat, chatSchema } from './schemas/chat.schema';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: chatSchema }]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
