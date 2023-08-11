import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('A user connected');
  }

  handleDisconnect(client: Socket) {
    console.log('User disconnected');
  }

  @SubscribeMessage('send message')
  handleMessage(
    client: Socket,
    payload: { username: string; message: string },
  ) {
    const { username, message } = payload;
    this.server.emit('receive message', `${username}: ${message}`);
  }
}
