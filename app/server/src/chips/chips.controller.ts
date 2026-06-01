import { Controller, Get, Param } from '@nestjs/common';
import { ChipsService } from './chips.service';

@Controller('chips')
export class ChipsController {
  constructor(private readonly chipsService: ChipsService) {}

  @Get()
  findAll() {
    return this.chipsService.findAll();
  }

  @Get('guess')
  getChipGuesses() {
    return this.chipsService.getChipGuesses();
  }

  @Get('by/:chipGuessId')
  getChipBys(@Param('chipGuessId') chipGuessId: string) {
    return this.chipsService.getChipBys(chipGuessId);
  }

  @Get('filter/:chipById')
  getChipFilters(@Param('chipById') chipById: string) {
    return this.chipsService.getChipFilters(chipById);
  }
}
