import { Controller, Get } from '@nestjs/common';
import { ChipsService } from './chips.service';

@Controller('chips')
export class ChipsController {
  constructor(private readonly chipsService: ChipsService) {}

  @Get('guess')
  getChipGuesses() {
    return this.chipsService.getChipGuesses();
  }

  @Get('by')
  getChipBys() {
    return this.chipsService.getChipBys();
  }
}
