import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { TxVolumeController } from './tx-volume/tx-volume.controller';
import { TxVolumeService } from './tx-volume/tx-volume.service';
import { StakingReturnService } from './staking-return/staking-return.service';
import { StakingReturnController } from './staking-return/staking-return.controller';

@Module({
  imports: [HttpModule, CacheModule.register({ ttl: undefined })],
  controllers: [TxVolumeController, StakingReturnController],
  providers: [CacheService, TxVolumeService, StakingReturnService],
})
export class AppModule {}
