import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

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

  getTaxRewards() {
    return this.fetchFCD();
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
