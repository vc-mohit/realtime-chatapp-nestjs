import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';
@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly socketService: ChatService) {}

  handleConnection(socket: Socket) {
    this.socketService.handleConnection(socket);
  }

  handleDisconnect(socket: Socket) {
    // Handle disconnection if needed
  }
}
