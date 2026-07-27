import { Controller, Post, Param, Get } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CurrentUser } from '@/current-user.decorator';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get()
  getMyCommunities(@CurrentUser('id') userId: string) {
    return this.communityService.getMyCommunities(userId);
  }

  @Post()
  create(@CurrentUser('id') ownerId: string) {
    return this.communityService.create(ownerId);
  }

  @Post(':communityId/join')
  join(
    @Param('communityId') communityId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.communityService.join(communityId, userId);
  }
}
