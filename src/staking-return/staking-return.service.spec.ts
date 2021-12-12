import { Test, TestingModule } from '@nestjs/testing';
import { StakingReturnService } from './staking-return.service';

describe('StakingReturnService', () => {
  let service: StakingReturnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StakingReturnService],
    }).compile();

    service = module.get<StakingReturnService>(StakingReturnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
