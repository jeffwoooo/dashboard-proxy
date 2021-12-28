import { Controller, Get, Param } from '@nestjs/common';
import { map } from 'rxjs';
import { checkResultExist } from 'src/util/check-result-exist';
import { TxVolumeService } from './tx-volume.service';

@Controller('tx-volume')
export class TxVolumeController {
  constructor(private txVolumeService: TxVolumeService) {}

  @Get(':denom/periodic')
  getPeriodicData(@Param('denom') denom: string) {
    return this.txVolumeService.getTxVolume(denom).pipe(
      checkResultExist(),
      map((d) => d.periodic),
    );
  }

  @Get(':denom/cumulative')
  getCumulativeData(@Param('denom') denom: string) {
    return this.txVolumeService.getTxVolume(denom).pipe(
      checkResultExist(),
      map((d) => d.cumulative),
    );
  }
}
