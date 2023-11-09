import { Test, TestingModule } from '@nestjs/testing';
import { LsController } from './ls.controller';
import { LsService } from './ls.service';

describe('LsController', () => {
  let controller: LsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LsController],
      providers: [LsService],
    }).compile();

    controller = module.get<LsController>(LsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
