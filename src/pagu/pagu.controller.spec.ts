import { Test, TestingModule } from '@nestjs/testing';
import { PaguController } from './pagu.controller';
import { PaguService } from './pagu.service';

describe('PaguController', () => {
  let controller: PaguController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaguController],
      providers: [PaguService],
    }).compile();

    controller = module.get<PaguController>(PaguController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
