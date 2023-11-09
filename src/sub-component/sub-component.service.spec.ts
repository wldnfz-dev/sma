import { Test, TestingModule } from '@nestjs/testing';
import { SubComponentService } from './sub-component.service';

describe('SubComponentService', () => {
  let service: SubComponentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubComponentService],
    }).compile();

    service = module.get<SubComponentService>(SubComponentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
