import { Test, TestingModule } from '@nestjs/testing';
import { LsService } from './ls.service';

describe('LsService', () => {
  let service: LsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LsService],
    }).compile();

    service = module.get<LsService>(LsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
