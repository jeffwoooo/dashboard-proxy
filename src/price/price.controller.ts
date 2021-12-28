import { Controller, Get, Param, Query } from '@nestjs/common';
import { PriceService } from './price.service';

@Controller('price')
export class PriceController {
  constructor(private priceService: PriceService) {}

  @Get(':denom')
  getPrice(@Param('denom') denom: string, @Query('interval') interval: string) {
    return this.priceService.getPrice(denom, interval);
  }
}
