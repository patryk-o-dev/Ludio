import { IsString, IsUUID } from 'class-validator';

export class CreateGameSessionDto {
  @IsUUID()
  gameConfigId: string;

  @IsString({ each: true })
  playerIds: string[];

  @IsString()
  hostId: string;
}
