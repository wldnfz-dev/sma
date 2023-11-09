import { Test, TestingModule } from '@nestjs/testing';
import { SubComponentController } from './sub-component.controller';
import { SubComponentService } from './sub-component.service';

describe('SubComponentController', () => {
  let controller: SubComponentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubComponentController],
      providers: [SubComponentService],
    }).compile();

    controller = module.get<SubComponentController>(SubComponentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
