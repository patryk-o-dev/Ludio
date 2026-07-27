import { IsString } from 'class-validator';

export enum CreateGameSessionType {
  PRIVATE = 'PRIVATE',
  COMMUNITY = 'COMMUNITY',
}

export class CreateGameSessionDto {
  @IsString()
  gameConfigId: string;

  @IsString({ each: true })
  playerIds: string[];

  @IsString()
  type: CreateGameSessionType;
}
