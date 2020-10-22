import { Test, TestingModule } from '@nestjs/testing';
import { ZombiesController } from './zombies.controller';

describe('ZombiesController', () => {
  let controller: ZombiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZombiesController],
    }).compile();

    controller = module.get<ZombiesController>(ZombiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
