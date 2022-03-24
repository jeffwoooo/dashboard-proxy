import { Controller, Get, NotFoundException } from '@nestjs/common';
import { map } from 'rxjs';
import { checkResultExist } from 'src/util/check-result-exist';
import { AccountsService as WalletsService } from './accounts.service';

@Controller('wallets')
export class WalletsController {
  constructor(private accountsService: WalletsService) {}

  @Get(['total/periodic', 'new/periodic'])
  getTotalPeriodicData() {
    return this.accountsService.getAccounts().pipe(
      checkResultExist(),
      map((d) => d.total.periodic),
    );
  }

  @Get(['total/cumulative', 'new/cumulative'])
  getTotalCumulativeData() {
    return this.accountsService.getAccounts().pipe(
      checkResultExist(),
      map((d) => d.total.cumulative),
    );
  }

  @Get('active')
  getActiveData() {
    return this.accountsService.activeAccounts();
  }

  @Get('active/periodic')
  getActivePeriodicData() {
    return this.accountsService.getAccounts().pipe(
      checkResultExist(),
      map((d) => d.active.periodic),
    );
  }

  @Get('active/cumulative')
  getActiveCumulativeData() {
    return this.accountsService.getAccounts().pipe(
      checkResultExist(),
      map((d) => d.active.cumulative),
    );
  }
}
