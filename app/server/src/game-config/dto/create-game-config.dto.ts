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
  @IsUUID()
  chipFilterId?: string;

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
}
