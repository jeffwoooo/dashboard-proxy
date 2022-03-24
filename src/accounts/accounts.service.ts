import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import BigNumber from 'bignumber.js';
import { format, startOfToday, subDays } from 'date-fns';
import { map, Observable, zip } from 'rxjs';
import { Connection } from 'typeorm';
import * as nodeCron from 'node-cron';

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

export interface ActiveAccountSum {
  [key: string]: string;
}

const activeAccountSumPeriod = [7, 14, 30];

@Injectable()
export class AccountsService {
  private activeAccSumResult: ActiveAccountSum;
  private pendingActiveAccSumDate: Date;
  private pendingActiveAccSumResult: ActiveAccountSum;

  constructor(private connection: Connection, private httpService: HttpService) {
    this.fetchActiveAccountSum(activeAccountSumPeriod).catch((err) => {
      console.error(err);
    });

    nodeCron.schedule('0 20 0 * * *', () => {
      this.fetchActiveAccountSum(activeAccountSumPeriod).catch((err) => {
        console.error(err);
      });
    });
  }

  private async fetchActiveAccountSum(periodList: number[]) {
    periodList = periodList.sort((a, b) => a - b);

    const today = startOfToday();
    const from = format(subDays(today, periodList[periodList.length - 1]) || 0, 'yyyy-MM-dd HH:mm:ss');
    const to = format(today, 'yyyy-MM-dd HH:mm:ss');

    // EXP: we are using count (SELECT DISTINCT account FROM x) rather COUNT(DISTINCT account) because its is 10 times faster.
    // const subQuery = `SELECT DISTINCT account FROM account_tx WHERE timestamp < '${to}' and timestamp >= '${from}'`;
    // const rawQuery = `SELECT COUNT(*) AS active_account_count FROM (${subQuery}) AS t`;
    const subQuery = `SELECT account, DATE(MAX(timestamp)) AS last_date FROM account_tx 
    WHERE timestamp < '${to}' and timestamp >= '${from}' GROUP BY account`;

    const rawQuery = `SELECT COUNT(*) AS distinct_active_account_count, t.last_date AS date
    FROM (${subQuery}) AS t
    GROUP BY t.last_date ORDER BY t.last_date DESC`;

    const result: any[] = await this.connection.query(rawQuery);

    this.pendingActiveAccSumDate = today;
    this.pendingActiveAccSumResult = result
      .reduce<BigNumber[]>(
        (prev, cur, index) => {
          return prev.map((v, i) => {
            if (index < periodList[i]) {
              return v.plus(cur.distinct_active_account_count);
            }
            return v;
          });
        },
        Array.from({ length: periodList.length }, () => new BigNumber(0)),
      )
      .reduce((map, cur, index) => {
        map[periodList[index]] = cur.toString();
        return map;
      }, {});
  }

  private fetchFCD() {
    const activeAccountsPath = 'dashboard/active_accounts';
    const registeredAccountsPath = 'dashboard/registered_accounts';

    const res = zip(
      this.httpService.get(activeAccountsPath).pipe(map((r) => r.data)),
      this.httpService.get(registeredAccountsPath).pipe(map((r) => r.data)),
    );

    return res.pipe(map(([active, registered]) => this.parseAccounts(active, registered)));
  }

  getAccounts() {
    return this.fetchFCD();
  }

  async activeAccounts() {
    let fcdResult: ExpectedAccounts;
    await this.fetchFCD().forEach((v) => {
      fcdResult = v;
    });

    const lastDatetime = fcdResult.active.periodic[fcdResult.active.periodic.length - 1].datetime;
    if (!this.activeAccSumResult || this.pendingActiveAccSumDate?.getTime() === lastDatetime) {
      this.activeAccSumResult = this.pendingActiveAccSumResult;
      this.pendingActiveAccSumResult = undefined;
      this.pendingActiveAccSumDate = undefined;
    }

    return {
      sum: this.activeAccSumResult,
      daily: fcdResult.active.periodic,
    };
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
