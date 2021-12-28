import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TxVolumeController } from './tx-volume/tx-volume.controller';
import { TxVolumeService } from './tx-volume/tx-volume.service';
import { TaxRewardsController } from './tax-rewards/tax-rewards.controller';
import { TaxRewardsService } from './tax-rewards/tax-rewards.service';
import { WalletsController } from './accounts/accounts.controller';
import { AccountsService } from './accounts/accounts.service';
import { StakingReturnService } from './staking-return/staking-return.service';
import { StakingReturnController } from './staking-return/staking-return.controller';
import { AppController } from './app.controller';
import { PriceController } from './price/price.controller';
import { PriceService } from './price/price.service';

@Module({
  imports: [HttpModule],
  controllers: [
    AppController,
    TxVolumeController,
    TaxRewardsController,
    WalletsController,
    StakingReturnController,
    PriceController,
  ],
  providers: [
    TxVolumeService,
    TaxRewardsService,
    AccountsService,
    StakingReturnService,
    PriceService,
  ],
})
export class AppModule {}
