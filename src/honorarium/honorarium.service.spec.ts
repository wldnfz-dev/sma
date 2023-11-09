import { Test, TestingModule } from '@nestjs/testing';
import { HonorariumService } from './honorarium.service';

describe('HonorariumService', () => {
  let service: HonorariumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HonorariumService],
    }).compile();

    service = module.get<HonorariumService>(HonorariumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
