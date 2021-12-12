import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { BigNumber } from 'bignumber.js';
import { AxiosRequestConfig } from 'axios';
import { CacheService } from 'src/cache.service';
import { map } from 'rxjs';

/* StakingReturn: Received → Expected */
interface ReceivedStakingReturnItem {
  datetime: number;
  dailyReturn: string;
  annualizedReturn: string;
}

type ReceivedStakingReturn = ReceivedStakingReturnItem[];

export interface ExpectedStakingReturn {
  annualized: ExpectedItem[];
  daily: ExpectedItem[];
}

@Injectable()
export class StakingReturnService {
  constructor(
    private httpService: HttpService,
    private appService: CacheService,
  ) {}

  private fetchFCD() {
    const path = 'staking_return';

    const res = this.httpService.get(path);

    return this.appService.cacheWrap(path, () => {
      return res.pipe(
        map((r) => r.data),
        map(this.parseStakingReturn),
      );
    });
  }

  getStakingReturn() {
    return this.fetchFCD();
  }

  private parseStakingReturn = (
    data: ReceivedStakingReturn,
  ): ExpectedStakingReturn => {
    return {
      annualized: data.map(({ datetime, annualizedReturn }) => {
        return { datetime, value: new BigNumber(annualizedReturn).toString() };
      }),
      daily: data.map(({ datetime, dailyReturn }) => {
        return { datetime, value: new BigNumber(dailyReturn).toString() };
      }),
    };
  };
}
