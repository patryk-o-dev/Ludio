import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: 'http://localhost:5173' } })
export class GameSessionGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() data: { sessionId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.sessionId);
  }
}
