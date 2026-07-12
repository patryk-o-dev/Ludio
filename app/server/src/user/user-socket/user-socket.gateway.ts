import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class UserSocketGateway {
  @WebSocketServer()
  server: Server;

  notifyUser(userId: string) {
    this.server.to(userId).emit('friend-request-created');
  }
}
