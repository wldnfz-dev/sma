import { Test, TestingModule } from '@nestjs/testing';
import { GuService } from './gu.service';

describe('GuService', () => {
  let service: GuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuService],
    }).compile();

    service = module.get<GuService>(GuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
