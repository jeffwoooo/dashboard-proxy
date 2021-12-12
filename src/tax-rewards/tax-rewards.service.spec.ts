import { Test, TestingModule } from '@nestjs/testing';
import { TaxRewardsService } from './tax-rewards.service';

describe('TaxRewardsService', () => {
  let service: TaxRewardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxRewardsService],
    }).compile();

    service = module.get<TaxRewardsService>(TaxRewardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
