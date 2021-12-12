import { Controller, Get, NotFoundException } from '@nestjs/common';
import { map } from 'rxjs';
import { TaxRewardsService } from './tax-rewards.service';

@Controller('tax-rewards')
export class TaxRewardsController {
  constructor(private taxRewardsService: TaxRewardsService) {}

  @Get('periodic')
  getPeriodicData() {
    return this.taxRewardsService.getTaxRewards().pipe(
      map((d) => {
        if (d === undefined) {
          throw new NotFoundException();
        }
        return d.periodic;
      }),
    );
  }

  @Get('cumulative')
  getCumulativeData() {
    return this.taxRewardsService.getTaxRewards().pipe(
      map((d) => {
        if (d === undefined) {
          throw new NotFoundException();
        }
        return d.cumulative;
      }),
    );
  }
}
