import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import BigNumber from 'bignumber.js';
import { map, mergeMap, Observable, tap } from 'rxjs';

/* BlockRewards: Received → Expected */
interface ReceivedBlockRewards {
  cumulative: { datetime: number; blockReward: string }[];
  periodic: { datetime: number; blockReward: string }[];
}

export interface ExpectedTaxRewards {
  cumulative: ExpectedItem[];
  periodic: ExpectedItem[];
}

@Injectable()
export class TaxRewardsService {
  constructor(private httpService: HttpService) {}

  private fetchFCD() {
    const path = 'block_rewards';

    const res = this.httpService.get(path);

    return res.pipe(
      map((r) => r.data),
      map(this.parseBlockRewards),
    );
  }

  private convertToUST(
    rewards: ExpectedTaxRewards,
  ): Observable<ExpectedTaxRewards> {
    return this.httpService
      .get('https://lcd.terra.dev/oracle/denoms/exchange_rates')
      .pipe(
        map((res) => res.data?.result),
        map((coins: { denom: string; amount: string }[]) => {
          const askRate = coins.find((coin) => coin.denom === 'uusd')?.amount;
          const offerRate = coins.find((coin) => coin.denom === 'ukrw')?.amount;
          const rate = new BigNumber(askRate).div(offerRate);

          return {
            cumulative: rewards.cumulative.map((r) => {
              r.value = new BigNumber(r.value).times(rate).toString();
              return r;
            }),
            periodic: rewards.periodic.map((r) => {
              r.value = new BigNumber(r.value).times(rate).toString();
              return r;
            }),
          };
        }),
      );
  }

  getTaxRewards() {
    return this.fetchFCD().pipe(
      mergeMap((rewards) => {
        return this.convertToUST(rewards);
      }),
    );
  }

  private parseBlockRewards = ({
    cumulative,
    periodic,
  }: ReceivedBlockRewards): ExpectedTaxRewards => {
    return {
      cumulative: cumulative.map(({ datetime, blockReward }) => {
        return { datetime, value: blockReward };
      }),
      periodic: periodic.map(({ datetime, blockReward }) => {
        return { datetime, value: blockReward };
      }),
    };
  };
}
