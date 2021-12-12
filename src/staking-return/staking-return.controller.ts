import { Controller, Get, NotFoundException } from '@nestjs/common';
import { map } from 'rxjs';
import { checkResultExist } from 'src/util/check-result-exist';
import { StakingReturnService } from './staking-return.service';

@Controller('staking-return')
export class StakingReturnController {
  constructor(private stakingReturnService: StakingReturnService) {}

  @Get('annualized')
  getAnnualizedData() {
    return this.stakingReturnService.getStakingReturn().pipe(
      checkResultExist(),
      map((d) => d.annualized),
    );
  }

  @Get('daily')
  getDailyData() {
    return this.stakingReturnService.getStakingReturn().pipe(
      checkResultExist(),
      map((d) => d.daily),
    );
  }
}
