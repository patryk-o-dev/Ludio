import { PartialType } from '@nestjs/mapped-types';
import { CreateGameConfigDto } from './create-game-config.dto';

export class UpdateGameConfigDto extends PartialType(CreateGameConfigDto) {}
