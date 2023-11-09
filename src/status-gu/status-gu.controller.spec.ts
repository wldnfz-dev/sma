import { Test, TestingModule } from '@nestjs/testing';
import { StatusGuController } from './status-gu.controller';
import { StatusGuService } from './status-gu.service';

describe('StatusGuController', () => {
  let controller: StatusGuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusGuController],
      providers: [StatusGuService],
    }).compile();

    controller = module.get<StatusGuController>(StatusGuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
