import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { JoinCommunityDto } from './dto/join-community.dto';
import { CommunityResponseDto } from './dto/community-response.dto';

@Injectable()
export class CommunityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommunityDto: CreateCommunityDto) {
    const inviteLinkBase = 'http://localhost:5173/community/join?join=';
    const owner = await this.prisma.user.findUnique({
      where: { id: createCommunityDto.ownerId },
    });

    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    const existingCommunity = await this.prisma.community.findUnique({
      where: { ownerId: createCommunityDto.ownerId },
    });

    if (existingCommunity) {
      return `${inviteLinkBase}${existingCommunity.id}`;
    }

    await this.prisma.community.create({
      data: {
        owner: {
          connect: { id: createCommunityDto.ownerId },
        },
        members: {
          create: {
            user: {
              connect: { id: createCommunityDto.ownerId },
            },
          },
        },
      },
      include: {
        owner: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    const createdCommunity = await this.prisma.community.findUnique({
      where: { ownerId: createCommunityDto.ownerId },
    });

    return `${inviteLinkBase}${createdCommunity.id}`;
  }

  async join(communityId: string, joinCommunityDto: JoinCommunityDto) {
    const community = await this.prisma.community.findUnique({
      where: { id: communityId },
      include: {
        owner: true,
      },
    });

    if (!community) {
      throw new NotFoundException('Community not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: joinCommunityDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.communityMember.upsert({
      where: {
        communityId_userId: {
          communityId,
          userId: joinCommunityDto.userId,
        },
      },
      update: {},
      create: {
        community: {
          connect: { id: communityId },
        },
        user: {
          connect: { id: joinCommunityDto.userId },
        },
      },
    });

    return this.prisma.community.findUnique({
      where: { id: communityId },
      include: {
        owner: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async getMyCommunities(userId: string): Promise<CommunityResponseDto[]> {
    const communities = await this.prisma.community.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        owner: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    return communities
      .sort((a, b) => {
        if (a.ownerId === userId) return -1;
        if (b.ownerId === userId) return 1;
        return 0;
      })
      .map((community) => ({
        id: community.id,
        owner: {
          displayName: community.owner.displayName,
          avatarUrl: community.owner.avatarUrl,
        },
        members: community.members.map((member) => ({
          id: member.user.id,
          displayName: member.user.displayName,
          avatarUrl: member.user.avatarUrl,
          twitchId: member.user.twitchId,
          points: member.points,
        })),
      }));
  }
}
