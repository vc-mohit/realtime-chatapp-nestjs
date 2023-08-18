import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'chat-app',
    }),
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
