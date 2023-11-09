import { Test, TestingModule } from '@nestjs/testing';
import { JaldisService } from './jaldis.service';

describe('JaldisService', () => {
  let service: JaldisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JaldisService],
    }).compile();

    service = module.get<JaldisService>(JaldisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
