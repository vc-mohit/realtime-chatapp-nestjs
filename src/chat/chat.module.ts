import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat, chatSchema } from './schemas/chat.schema';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './schemas/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: chatSchema },
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
