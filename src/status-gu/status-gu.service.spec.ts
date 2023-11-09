import { Test, TestingModule } from '@nestjs/testing';
import { StatusGuService } from './status-gu.service';

describe('StatusGuService', () => {
  let service: StatusGuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusGuService],
    }).compile();

    service = module.get<StatusGuService>(StatusGuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
