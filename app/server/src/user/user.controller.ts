import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getMyFriends(@Param('id') id: string) {
    return this.userService.getMyFriends(id);
  }

  @Post(':userId/friendship/:friendId')
  addFriend(
    @Param('userId') userId: string,
    @Param('friendId') friendId: string,
  ) {
    return this.userService.addFriend(userId, friendId);
  }

  @Post(':userId/friendship/:friendId/respond')
  handleFriendRequest(
    @Param('userId') userId: string,
    @Param('friendId') friendId: string,
    @Body('accept') accept: boolean,
  ) {
    return this.userService.handleFriendRequest(userId, friendId, accept);
  }

  @Get(':id/friend-requests')
  getFriendRequests(@Param('id') id: string) {
    return this.userService.getFriendRequests(id);
  }
}
