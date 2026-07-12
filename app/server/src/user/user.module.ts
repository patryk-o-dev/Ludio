import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSocketGateway } from './user-socket/user-socket.gateway';

@Module({
  controllers: [UserController],
  providers: [UserService, UserSocketGateway],
})
export class UserModule {}
