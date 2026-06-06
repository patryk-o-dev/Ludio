import { forwardRef, Inject } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameSessionService } from '../game-session.service';

@WebSocketGateway({ cors: { origin: 'http://localhost:5173' } })
export class GameSessionGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => GameSessionService))
    private readonly gameSessionService: GameSessionService,
  ) {}

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() data: { sessionId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.sessionId);
    client.emit(
      'session:state',
      await this.gameSessionService.findState(data.sessionId),
    );
  }

  @SubscribeMessage('session:answer')
  async handleAnswer(
    @MessageBody()
    data: {
      sessionId: string;
      userId: string;
      answerId: string;
      timeMs: number;
    },
    @ConnectedSocket() _client: Socket,
  ) {
    await this.gameSessionService.submitAnswer(
      data.sessionId,
      data.userId,
      data.answerId,
      data.timeMs,
    );
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.auth.userId;

    if (userId) {
      client.join(userId);
    }
  }
}
