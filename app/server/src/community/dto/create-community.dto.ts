import { IsUUID } from 'class-validator';

export class CreateCommunityDto {
  @IsUUID()
  ownerId: string;
}
