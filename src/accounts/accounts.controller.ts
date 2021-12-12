import { Controller, Get, NotFoundException } from '@nestjs/common';
import { map } from 'rxjs';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get('total/periodic')
  getTotalPeriodicData() {
    return this.accountsService.getAccounts().pipe(
      map((d) => {
        if (d === undefined) {
          throw new NotFoundException();
        }
        return d.total.periodic;
      }),
    );
  }

  @Get('total/cumulative')
  getTotalCumulativeData() {
    return this.accountsService.getAccounts().pipe(
      map((d) => {
        if (d === undefined) {
          throw new NotFoundException();
        }
        return d.total.cumulative;
      }),
    );
  }

  @Get('active/periodic')
  getActivePeriodicData() {
    return this.accountsService.getAccounts().pipe(
      map((d) => {
        if (d === undefined) {
          throw new NotFoundException();
        }
        return d.active.periodic;
      }),
    );
  }

  @Get('active/cumulative')
  getActiveCumulativeData() {
    return this.accountsService.getAccounts().pipe(
      map((d) => {
        if (d === undefined) {
          throw new NotFoundException();
        }
        return d.active.cumulative;
      }),
    );
  }
}
