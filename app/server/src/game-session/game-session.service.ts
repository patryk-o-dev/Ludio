import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameSessionDto } from './dto/create-game-session.dto';
import { GameSessionGateway } from './game-session/game-session.gateway';

@Injectable()
export class GameSessionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: GameSessionGateway,
  ) {}

  async create(dto: CreateGameSessionDto) {
    const gameConfig = await this.prisma.gameConfig.findUnique({
      where: { id: dto.gameConfigId },
      include: { rules: true, options: true },
    });
    if (!gameConfig) {
      throw new NotFoundException('Game configuration not found or invalid');
    }

    const players = await this.prisma.user.findMany({
      where: { id: { in: dto.playerIds } },
    });
    if (players.length !== dto.playerIds.length) {
      throw new BadRequestException('One or more players are invalid');
    }

    const session = await this.prisma.gameSession.create({
      data: {
        gameConfigId: dto.gameConfigId,
        players: {
          create: dto.playerIds.map((userId) => ({ userId })),
        },
      },
      include: {
        gameConfig: {
          include: { rules: true, options: true },
        },
        players: true,
      },
    });

    return session;
  }

  async findOne(id: string) {
    const session = await this.prisma.gameSession.findUnique({
      where: { id },
      include: {
        gameConfig: {
          include: { rules: true, options: true },
        },
        players: true,
      },
    });
    if (!session) {
      throw new NotFoundException('Game session not found');
    }
    return session;
  }

  async acceptInvitation(sessionId: string, userId: string) {
    const session = await this.prisma.gameSession.findUnique({
      where: { id: sessionId },
      include: { players: true },
    });
    if (!session) {
      throw new NotFoundException('Game session not found');
    }

    const isPlayer = session.players.some((p) => p.userId === userId);
    if (!isPlayer) {
      throw new BadRequestException('User is not invited to this session');
    }

    await this.prisma.gameSession.update({
      where: { id: sessionId },
      data: {
        players: {
          update: {
            where: {
              gameSessionId_userId: {
                gameSessionId: sessionId,
                userId: userId,
              },
            },
            data: { status: 'Accepted' },
          },
        },
      },
    });
    if (
      session.players.every(
        (p) => p.userId === userId || p.status === 'Accepted',
      )
    ) {
      await this.prisma.gameSession.update({
        where: { id: sessionId },
        data: { status: 'InProgress' },
      });

      this.gateway.server.to(sessionId).emit('session:ready', { sessionId });
    }
    return this.findOne(sessionId);
  }
}
