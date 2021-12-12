import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { CacheService } from 'src/cache.service';

interface ReceivedTxVolume {
  periodic: { denom: string; data: ReceivedDatum[] }[];
  cumulative: { denom: string; data: ReceivedDatum[] }[];
}

export interface ExpectedTxVolume {
  [denom: string]: { periodic: ExpectedItem[]; cumulative: ExpectedItem[] };
}

@Injectable()
export class TxVolumeService {
  constructor(
    private httpService: HttpService,
    private appService: CacheService,
  ) {}

  private fetchFCD() {
    const path = 'tx_volume';

    const res = this.httpService.get(path);

    return this.appService.cacheWrap(path, () => {
      return res.pipe(
        map((r) => r.data),
        map(this.parseTxVolume),
      );
    });
  }

  getTxVolume(denom: string) {
    return this.fetchFCD().pipe(map((d) => d[denom]));
  }

  private parseTxVolume({
    periodic,
    cumulative,
  }: ReceivedTxVolume): ExpectedTxVolume {
    const convertItem = ({ datetime, txVolume }: ReceivedDatum) => {
      return { datetime, value: txVolume };
    };

    return periodic.reduce(
      (acc, { denom, data }) => ({
        ...acc,
        [denom]: {
          periodic: data.map(convertItem),
          cumulative:
            cumulative
              .find((item) => item.denom === denom)
              ?.data.map(convertItem) ?? [],
        },
      }),
      {},
    );
  }
}
