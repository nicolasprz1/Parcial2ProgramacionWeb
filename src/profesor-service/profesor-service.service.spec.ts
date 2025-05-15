import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorServiceService } from './profesor-service.service';

describe('ProfesorServiceService', () => {
  let service: ProfesorServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfesorServiceService],
    }).compile();

    service = module.get<ProfesorServiceService>(ProfesorServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
