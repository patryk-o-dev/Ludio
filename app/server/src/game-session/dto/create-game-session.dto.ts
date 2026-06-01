import { IsString, IsUUID } from 'class-validator';

export class CreateGameSessionDto {
  @IsUUID()
  gameConfigId: string;

  // @IsUUID('4', { each: true })
  @IsString({ each: true }) // Temporary workaround until we have real user IDs
  playerIds: string[];
}
