import { forwardRef, Inject } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { getFrontendOrigin } from '@/config/frontend-origin';
import { GameSessionService } from '../game-session.service';
import { PrismaService } from '@/prisma/prisma.service';

@WebSocketGateway({ cors: { origin: getFrontendOrigin() } })
export class GameSessionGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => GameSessionService))
    private readonly gameSessionService: GameSessionService,
    private readonly prisma: PrismaService,
  ) {}

  private getOverlayRoom(userId: string) {
    return `overlay:${userId}`;
  }

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
    },
    @ConnectedSocket() _client: Socket,
  ) {
    await this.gameSessionService.submitAnswer(
      data.sessionId,
      data.userId,
      data.answerId,
    );
  }

  @SubscribeMessage('session:surrender')
  async handleSurrender(
    @MessageBody()
    data: {
      sessionId: string;
      userId: string;
    },
    @ConnectedSocket() _client: Socket,
  ) {
    await this.gameSessionService.playerSurrender(data.userId, data.sessionId);
  }

  @SubscribeMessage('overlay:subscribe')
  async handleOverlaySubscribe(
    @MessageBody() data: { twitchId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { twitchId: data.twitchId },
      select: { id: true },
    });

    if (!user) {
      return;
    }

    client.join(this.getOverlayRoom(user.id));
  }

  @SubscribeMessage('overlay:unsubscribe')
  async handleOverlayUnsubscribe(
    @MessageBody() data: { twitchId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { twitchId: data.twitchId },
      select: { id: true },
    });

    if (!user) {
      return;
    }

    client.leave(this.getOverlayRoom(user.id));
  }

  handleConnection(client: Socket) {
    const userId = client.handshake.auth.userId;

    if (userId) {
      client.join(userId);
    }
  }
}
