import { Controller, Get, NotFoundException } from '@nestjs/common';
import { map } from 'rxjs';
import { StakingReturnService } from './staking-return.service';

@Controller('staking-return')
export class StakingReturnController {
  constructor(private stakingReturnService: StakingReturnService) {}

  @Get('annualized')
  getAnnualizedData() {
    return this.stakingReturnService.getStakingReturn().pipe(
      map((d) => {
        if (d === undefined) {
          throw new NotFoundException();
        }
        return d.annualized;
      }),
    );
  }

  @Get('daily')
  getDailyData() {
    return this.stakingReturnService.getStakingReturn().pipe(
      map((d) => {
        if (d === undefined) {
          throw new NotFoundException();
        }
        return d.daily;
      }),
    );
  }
}
