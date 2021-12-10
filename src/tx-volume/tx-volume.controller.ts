import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { defaultIfEmpty, map } from 'rxjs';
import { json } from 'stream/consumers';
import { TxVolumeService } from './tx-volume.service';

@Controller('tx-volume')
export class TxVolumeController {
  constructor(private txVolumeService: TxVolumeService) {}

  @Get(':denom/periodic')
  getPeriodicData(@Param('denom') denom: string) {
    return this.txVolumeService.getTxVolume(denom).pipe(
      map((d) => {
        if (d === undefined) {
          throw new NotFoundException();
        }
        return d.periodic;
      }),
    );
  }

  @Get(':denom/cumulative')
  getCumulativeData(@Param('denom') denom: string) {
    return this.txVolumeService.getTxVolume(denom).pipe(
      map((d) => {
        if (d === undefined) {
          throw new NotFoundException();
        }
        return d.cumulative;
      }),
    );
  }
}
