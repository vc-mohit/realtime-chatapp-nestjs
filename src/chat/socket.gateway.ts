import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    const chatData = await this.chatService.createUserAndRoom();
    socket.join(chatData.roomId);

    socket.on('send-message', async (message) => {
      const savedMessage = await this.chatService.saveMessage(
        chatData._id,
        message,
      );
      socket.to(chatData.roomId).emit('receive-message', savedMessage);
    });

    socket.on('disconnect', async () => {
      await this.chatService.leaveRoom(chatData._id);
    });
  }
}
