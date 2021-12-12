import { Test, TestingModule } from '@nestjs/testing';
import { StakingReturnController } from './staking-return.controller';

describe('StakingReturnController', () => {
  let controller: StakingReturnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StakingReturnController],
    }).compile();

    controller = module.get<StakingReturnController>(StakingReturnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
