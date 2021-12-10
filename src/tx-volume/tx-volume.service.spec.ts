import { Test, TestingModule } from '@nestjs/testing';
import { TxVolumeService } from './tx-volume.service';

describe('TxVolumeService', () => {
  let service: TxVolumeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TxVolumeService],
    }).compile();

    service = module.get<TxVolumeService>(TxVolumeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
