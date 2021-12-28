import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs';

interface ReceivedPriceItem {
  denom: string;
  datetime: number;
  price: number;
}

@Injectable()
export class PriceService {
  constructor(private httpService: HttpService) {}

  async getPrice(denom: string, interval: string) {
    return this.httpService
      .get('market/price', {
        params: {
          denom: denom,
          interval: interval,
        },
      })
      .pipe(
        catchError((e) => {
          throw new HttpException(e.response.data, e.response.status);
        }),
        map((r) => r.data.prices),
        map(this.parsePrices),
      );
  }

  private parsePrices = (data: ReceivedPriceItem[]): ExpectedItem[] => {
    return data.map(({ datetime, price }) => ({
      datetime,
      value: String(price),
    }));
  };
}
