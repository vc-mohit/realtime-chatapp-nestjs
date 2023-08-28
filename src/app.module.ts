import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
import { CustomerAssistantModule } from './customer-assistant/customer-assistant.module';

@Module({
  imports: [ChatModule, CustomerAssistantModule],
  controllers: [AppController, ChatController],
  providers: [AppService],
})
export class AppModule {}
