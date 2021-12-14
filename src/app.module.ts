import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TxVolumeController } from './tx-volume/tx-volume.controller';
import { TxVolumeService } from './tx-volume/tx-volume.service';
import { TaxRewardsController } from './tax-rewards/tax-rewards.controller';
import { TaxRewardsService } from './tax-rewards/tax-rewards.service';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsService } from './accounts/accounts.service';
import { StakingReturnService } from './staking-return/staking-return.service';
import { StakingReturnController } from './staking-return/staking-return.controller';

@Module({
  imports: [HttpModule],
  controllers: [
    TxVolumeController,
    TaxRewardsController,
    AccountsController,
    StakingReturnController,
  ],
  providers: [
    TxVolumeService,
    TaxRewardsService,
    AccountsService,
    StakingReturnService,
  ],
})
export class AppModule {}
