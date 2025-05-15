import { Test, TestingModule } from '@nestjs/testing';
import { EvaluacionServiceService } from './evaluacion-service.service';

describe('EvaluacionServiceService', () => {
  let service: EvaluacionServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvaluacionServiceService],
    }).compile();

    service = module.get<EvaluacionServiceService>(EvaluacionServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
