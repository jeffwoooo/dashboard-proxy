import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TxVolumeController } from './tx-volume/tx-volume.controller';
import { TxVolumeService } from './tx-volume/tx-volume.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController, TxVolumeController],
  providers: [AppService, TxVolumeService],
})
export class AppModule {}
