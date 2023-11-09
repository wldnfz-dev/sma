import { Test, TestingModule } from '@nestjs/testing';
import { PaguService } from './pagu.service';

describe('PaguService', () => {
  let service: PaguService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaguService],
    }).compile();

    service = module.get<PaguService>(PaguService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
