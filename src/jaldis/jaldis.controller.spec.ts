import { Test, TestingModule } from '@nestjs/testing';
import { JaldisController } from './jaldis.controller';
import { JaldisService } from './jaldis.service';

describe('JaldisController', () => {
  let controller: JaldisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JaldisController],
      providers: [JaldisService],
    }).compile();

    controller = module.get<JaldisController>(JaldisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
