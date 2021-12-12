import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable, zip } from 'rxjs';
import { CacheService } from 'src/cache.service';

/* Accounts: Received → Expected */
interface ReceivedAccountItem {
  datetime: number;
  value: number;
}

interface ReceivedActiveAccounts {
  periodic: ReceivedAccountItem[];
  total: number;
}

interface ReceivedRegisteredAccounts {
  periodic: ReceivedAccountItem[];
  cumulative: ReceivedAccountItem[];
  total: number;
}

export interface ExpectedAccounts {
  total: {
    cumulative: ExpectedItem[];
    periodic: ExpectedItem[];
  };
  active: {
    cumulative: ExpectedItem[];
    periodic: ExpectedItem[];
  };
}

@Injectable()
export class AccountsService {
  constructor(
    private httpService: HttpService,
    private appService: CacheService,
  ) {}

  private fetchFCD() {
    const activeAccountsPath = 'active_accounts';
    const registeredAccountsPath = 'registered_accounts';
    const cacheKey = 'accounts';

    const res = zip(
      this.httpService.get(activeAccountsPath).pipe(map((r) => r.data)),
      this.httpService.get(registeredAccountsPath).pipe(map((r) => r.data)),
    );

    return this.appService.cacheWrap(cacheKey, () => {
      return res.pipe(
        map(([active, registered]) => this.parseAccounts(active, registered)),
      );
    });
  }

  getAccounts() {
    return this.fetchFCD();
  }

  private parseAccounts = (
    { total: totalActive, ...active }: ReceivedActiveAccounts,
    { total: totalRegistered, ...registered }: ReceivedRegisteredAccounts,
  ): ExpectedAccounts => {
    const stringifyValues = (data: ReceivedAccountItem[]) =>
      data.map(({ datetime, value }) => ({ datetime, value: String(value) }));

    return {
      total: {
        cumulative: stringifyValues(registered.cumulative),
        periodic: stringifyValues(registered.periodic),
      },
      active: {
        cumulative: stringifyValues([]),
        periodic: stringifyValues(active.periodic),
      },
    };
  };
}
