import { IsString, IsUUID } from 'class-validator';

export enum CreateGameSessionType {
  PRIVATE = 'PRIVATE',
  COMMUNITY = 'COMMUNITY',
}

export class CreateGameSessionDto {
  @IsUUID()
  gameConfigId: string;

  @IsString({ each: true })
  playerIds: string[];

  @IsString()
  hostId: string;

  @IsString()
  type: CreateGameSessionType;
}
