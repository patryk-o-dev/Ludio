import { IsUUID } from 'class-validator';

export class JoinCommunityDto {
  @IsUUID()
  userId: string;
}
