import { Test, TestingModule } from '@nestjs/testing';
import { SubOutputController } from './sub-output.controller';
import { SubOutputService } from './sub-output.service';

describe('SubOutputController', () => {
  let controller: SubOutputController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubOutputController],
      providers: [SubOutputService],
    }).compile();

    controller = module.get<SubOutputController>(SubOutputController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
