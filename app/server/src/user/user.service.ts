import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserSocketGateway } from './user-socket/user-socket.gateway';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userSocketGateway: UserSocketGateway,
  ) {}

  async addFriend(userId: string, friendId: string) {
    const targetUser = await this.prisma.user.findUnique({
      where: { twitchId: friendId },
      select: {
        id: true,
        allowFriendRequests: true,
      },
    });

    if (!targetUser) {
      throw new NotFoundException('User not found');
    }

    if (!targetUser.allowFriendRequests) {
      throw new ForbiddenException('User does not accept friend requests');
    }

    if (userId === targetUser.id) {
      throw new BadRequestException('Cannot add yourself');
    }

    const existingFriendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          {
            fromUserId: userId,
            toUserId: targetUser.id,
          },
          {
            fromUserId: targetUser.id,
            toUserId: userId,
          },
        ],
      },
    });

    if (existingFriendship) {
      throw new BadRequestException('Friendship already exist');
    }

    try {
      await this.prisma.friendship.create({
        data: {
          fromUserId: userId,
          toUserId: targetUser.id,
        },
      });

      this.userSocketGateway.notifyUser(targetUser.id);
    } catch (err) {
      throw new BadRequestException('Friend request failed', err);
    }
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
      this.userSocketGateway.notifyUser(userId);
      this.userSocketGateway.notifyUser(friendId);
    } else {
      await this.prisma.friendship.deleteMany({
        where: {
          fromUserId: friendId,
          toUserId: userId,
        },
      });
      this.userSocketGateway.notifyUser(friendId);
      this.userSocketGateway.notifyUser(userId);
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

  async updateFriendRequestSetting(
    userId: string,
    allowFriendRequests: boolean,
  ) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        allowFriendRequests,
      },
    });
  }

  async removeFriend(userId: string, friendId: string) {
    const friendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          {
            fromUserId: userId,
            toUserId: friendId,
          },
          {
            fromUserId: friendId,
            toUserId: userId,
          },
        ],
      },
    });

    if (!friendship) {
      throw new NotFoundException('Friendship not found');
    }

    await this.prisma.friendship.delete({
      where: {
        id: friendship.id,
      },
    });

    this.userSocketGateway.notifyUser(userId);
    this.userSocketGateway.notifyUser(friendId);

    return { success: true };
  }

  async deleteUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.$transaction(async (tx) => {
      const [hostedSessions, ownedCommunity] = await Promise.all([
        tx.gameSession.findMany({
          where: {
            hostId: userId,
          },
          select: {
            id: true,
            gameConfigId: true,
          },
        }),
        tx.community.findUnique({
          where: {
            ownerId: userId,
          },
          select: {
            id: true,
          },
        }),
      ]);

      if (ownedCommunity) {
        await tx.communityMember.deleteMany({
          where: {
            communityId: ownedCommunity.id,
          },
        });

        await tx.community.delete({
          where: {
            id: ownedCommunity.id,
          },
        });
      }

      await tx.friendship.deleteMany({
        where: {
          OR: [{ fromUserId: userId }, { toUserId: userId }],
        },
      });

      await tx.communityMember.deleteMany({
        where: {
          userId,
        },
      });

      await tx.gameSessionPlayer.deleteMany({
        where: {
          userId,
        },
      });

      if (hostedSessions.length > 0) {
        const hostedSessionIds = hostedSessions.map((session) => session.id);
        const gameConfigIds = hostedSessions.map(
          (session) => session.gameConfigId,
        );

        await tx.gameSession.deleteMany({
          where: {
            id: {
              in: hostedSessionIds,
            },
          },
        });

        await tx.gameConfig.deleteMany({
          where: {
            id: {
              in: gameConfigIds,
            },
          },
        });
      }

      await tx.user.delete({
        where: {
          id: userId,
        },
      });
    });

    return {
      message: 'User account deleted successfully',
    };
  }
}
