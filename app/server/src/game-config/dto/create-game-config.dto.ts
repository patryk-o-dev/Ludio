import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateRuleDto {
  @IsUUID()
  chipGuessId: string;

  @IsUUID()
  chipById: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  chipFilterIds?: string[];

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateOptionsDto {
  @IsInt()
  @Min(1)
  @Max(5)
  difficulty: number;

  @IsInt()
  @Min(1)
  questionLimit: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  timeLimitSeconds?: number | null;
}

export class CreateGameConfigDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRuleDto)
  rules: CreateRuleDto[];

  @ValidateNested()
  @Type(() => CreateOptionsDto)
  options: CreateOptionsDto;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  playerIds?: string[];
}
