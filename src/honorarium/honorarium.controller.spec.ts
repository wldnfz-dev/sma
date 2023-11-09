import { Test, TestingModule } from '@nestjs/testing';
import { HonorariumController } from './honorarium.controller';
import { HonorariumService } from './honorarium.service';

describe('HonorariumController', () => {
  let controller: HonorariumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HonorariumController],
      providers: [HonorariumService],
    }).compile();

    controller = module.get<HonorariumController>(HonorariumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
