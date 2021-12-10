import { Test, TestingModule } from '@nestjs/testing';
import { TxVolumeController } from './tx-volume.controller';

describe('TxVolumeController', () => {
  let controller: TxVolumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TxVolumeController],
    }).compile();

    controller = module.get<TxVolumeController>(TxVolumeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
