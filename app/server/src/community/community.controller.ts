import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { JoinCommunityDto } from './dto/join-community.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get()
  getMyCommunities(@Query('userId') userId: string) {
    return this.communityService.getMyCommunities(userId);
  }

  @Post()
  create(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communityService.create(createCommunityDto);
  }

  @Post(':communityId/join')
  join(
    @Param('communityId') communityId: string,
    @Body() joinCommunityDto: JoinCommunityDto,
  ) {
    return this.communityService.join(communityId, joinCommunityDto);
  }
}
