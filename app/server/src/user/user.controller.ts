import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from '@/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('friends')
  getFriends(@CurrentUser('id') userId: string) {
    return this.userService.getMyFriends(userId);
  }

  @Post('friendship/:friendId')
  addFriend(
    @CurrentUser('id') userId: string,
    @Param('friendId') friendId: string,
  ) {
    return this.userService.addFriend(userId, friendId);
  }

  @Post('friendship/:friendId/respond')
  handleFriendRequest(
    @CurrentUser('id') userId: string,
    @Param('friendId') friendId: string,
    @Body('accept') accept: boolean,
  ) {
    return this.userService.handleFriendRequest(userId, friendId, accept);
  }

  @Get('friend-requests')
  getFriendRequests(@CurrentUser('id') userId: string) {
    return this.userService.getFriendRequests(userId);
  }

  @Get(`sessions`)
  getMySessions(@CurrentUser('id') userId: string) {
    return this.userService.getMySessions(userId);
  }

  @Patch('settings/friend-requests')
  updateFriendRequestSetting(
    @CurrentUser('id') userId: string,
    @Body() body: { allowFriendRequests: boolean },
  ) {
    return this.userService.updateFriendRequestSetting(
      userId,
      body.allowFriendRequests,
    );
  }
}
