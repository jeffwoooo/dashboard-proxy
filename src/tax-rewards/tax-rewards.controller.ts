import { Controller, Get, NotFoundException } from '@nestjs/common';
import { map } from 'rxjs';
import { checkResultExist } from 'src/util/check-result-exist';
import { TaxRewardsService } from './tax-rewards.service';

@Controller('tax-rewards')
export class TaxRewardsController {
  constructor(private taxRewardsService: TaxRewardsService) {}

  @Get('periodic')
  getPeriodicData() {
    return this.taxRewardsService.getTaxRewards().pipe(
      checkResultExist(),
      map((d) => d.periodic),
    );
  }

  @Get('cumulative')
  getCumulativeData() {
    return this.taxRewardsService.getTaxRewards().pipe(
      checkResultExist(),
      map((d) => d.cumulative),
    );
  }
}
