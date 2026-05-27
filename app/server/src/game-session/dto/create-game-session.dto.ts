import { IsUUID } from 'class-validator';

export class CreateGameSessionDto {
  @IsUUID()
  gameConfigId: string;

  @IsUUID('4', { each: true })
  playerIds: string[];
}
