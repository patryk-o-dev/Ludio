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
}
