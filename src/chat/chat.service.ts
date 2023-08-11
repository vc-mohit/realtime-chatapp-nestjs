import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  private connectedSockets: Socket[] = [];

  handleConnection(socket: Socket) {
    this.connectedSockets.push(socket);

    socket.on('send message', ({ username, message }) => {
      const formattedMessage = `${username}: ${message}`;
      this.connectedSockets.forEach((connectedSocket) => {
        connectedSocket.emit('receive message', formattedMessage);
      });
    });
  }

  sendMessage(data: { username: string; message: string }) {
    const formattedMessage = `${data.username}: ${data.message}`;
    this.connectedSockets.forEach((connectedSocket) => {
      connectedSocket.emit('receive message', formattedMessage);
    });
  }
}
