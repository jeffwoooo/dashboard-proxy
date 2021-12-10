import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { TxVolumeController } from './tx-volume/tx-volume.controller';
import { TxVolumeService } from './tx-volume/tx-volume.service';

@Module({
  imports: [HttpModule, CacheModule.register({ttl: undefined})],
  controllers: [TxVolumeController],
  providers: [CacheService, TxVolumeService],
})
export class AppModule {}
