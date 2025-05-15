import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoServiceService } from './proyecto-service.service';

describe('ProyectoServiceService', () => {
  let service: ProyectoServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProyectoServiceService],
    }).compile();

    service = module.get<ProyectoServiceService>(ProyectoServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
