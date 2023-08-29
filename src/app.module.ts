import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
import { CustomerAssistantModule } from './customer-assistant/customer-assistant.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
