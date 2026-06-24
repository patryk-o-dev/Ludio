import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async addFriend(userId: string, friendId: string) {
    await this.prisma.friendship.create({
      data: {
        fromUserId: userId,
        toUserId: friendId,
      },
    });
  }

  async handleFriendRequest(userId: string, friendId: string, accept: boolean) {
    if (accept) {
      await this.prisma.friendship.updateMany({
        where: {
          fromUserId: friendId,
          toUserId: userId,
        },
        data: {
          status: 'ACCEPTED',
        },
      });
    } else {
      await this.prisma.friendship.deleteMany({
        where: {
          fromUserId: friendId,
          toUserId: userId,
        },
      });
    }
  }

  async getMyFriends(userId: string) {
    const relations = await this.prisma.friendship.findMany({
      where: {
        OR: [{ fromUserId: userId }, { toUserId: userId }],
        status: 'ACCEPTED',
      },
      include: {
        fromUser: true,
        toUser: true,
      },
    });

    return relations.map((r) =>
      r.fromUserId === userId ? r.toUser : r.fromUser,
    );
  }

  async getFriendRequests(userId: string) {
    const relations = await this.prisma.friendship.findMany({
      where: {
        toUserId: userId,
        status: 'PENDING',
      },
      include: {
        fromUser: true,
      },
    });
    return relations.map((r) => r.fromUser);
  }

  async getMySessions(userId: string) {
    return this.prisma.gameSession.findMany({
      where: {
        OR: [
          {
            hostId: userId,
          },
          {
            players: {
              some: {
                userId,
              },
            },
          },
        ],
        status: 'NotStarted',
      },
    });
  }
}
