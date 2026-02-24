import { Controller, Get, Param, Patch } from '@nestjs/common';
import { SetService } from './set.service';

@Controller('set')
export class SetController {
  constructor(private readonly setService: SetService) {}

  @Get()
  findAll() {
    return this.setService.findAll();
  }

  @Get('selected')
  findSelected() {
    return this.setService.findSelected();
  }

  @Patch('select/:setId')
  selectSet(@Param('setId') setId: string) {
    return this.setService.selectSet(setId);
  }
}
