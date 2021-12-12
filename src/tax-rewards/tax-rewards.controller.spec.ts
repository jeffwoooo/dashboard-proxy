import { Test, TestingModule } from '@nestjs/testing';
import { TaxRewardsController } from './tax-rewards.controller';

describe('TaxRewardsController', () => {
  let controller: TaxRewardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxRewardsController],
    }).compile();

    controller = module.get<TaxRewardsController>(TaxRewardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
