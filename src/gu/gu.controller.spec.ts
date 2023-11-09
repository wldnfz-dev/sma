import { Test, TestingModule } from '@nestjs/testing';
import { GuController } from './gu.controller';
import { GuService } from './gu.service';

describe('GuController', () => {
  let controller: GuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuController],
      providers: [GuService],
    }).compile();

    controller = module.get<GuController>(GuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
