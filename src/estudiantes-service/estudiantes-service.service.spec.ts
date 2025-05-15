import { Test, TestingModule } from '@nestjs/testing';
import { EstudiantesServiceService } from './estudiantes-service.service';

describe('EstudiantesServiceService', () => {
  let service: EstudiantesServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstudiantesServiceService],
    }).compile();

    service = module.get<EstudiantesServiceService>(EstudiantesServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
