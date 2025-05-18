/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EvaluacionService } from './evaluacion-service.service';
import { Evaluacion } from '../evaluacion/entity/evaluacion/evaluacion';
import { Proyecto } from '../proyecto/entity/proyecto/proyecto';
import { Profesor } from '../profesores/entity/profesores/profesores';
import { Repository } from 'typeorm';
import { BadRequestException} from '@nestjs/common';

describe('EvaluacionService', () => {
  let service: EvaluacionService;
  let evalRepo: Repository<Evaluacion>;
  let projRepo: Repository<Proyecto>;
  let profRepo: Repository<Profesor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluacionService,
        {
          provide: getRepositoryToken(Evaluacion),
          useValue: { create: jest.fn(), save: jest.fn() },
        },
        {
          provide: getRepositoryToken(Proyecto),
          useValue: { findOne: jest.fn() },
        },
        {
          provide: getRepositoryToken(Profesor),
          useValue: { findOne: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<EvaluacionService>(EvaluacionService);
    evalRepo = module.get(getRepositoryToken(Evaluacion));
    projRepo = module.get(getRepositoryToken(Proyecto));
    profRepo = module.get(getRepositoryToken(Profesor));
  });

  describe('crearEvaluacion', () => {
    it('Caso positivo: datos válidos', async () => {
      const dto = { proyectoId: 1, mentorId: 2, evaluadorId: 3, calificacion: 4 };
      // Proyecto existe
      (projRepo.findOne as jest.Mock).mockResolvedValue({ id: 1 });
      // Mentor y evaluador existen
      (profRepo.findOne as jest.Mock)
        .mockResolvedValueOnce({ id: 2 }) // mentor
        .mockResolvedValueOnce({ id: 3 }); // evaluador
      // Mock create + save
      (evalRepo.create as jest.Mock).mockReturnValue(dto);
      (evalRepo.save as jest.Mock).mockResolvedValue({ id: 10, ...dto });

      await expect(service.crearEvaluacion(dto)).resolves.toEqual({
        id: 10,
        ...dto,
      });
    });

    it('Caso negativo: mentor y evaluador iguales', async () => {
      const badDto = {
        proyectoId: 1,
        mentorId: 2,
        evaluadorId: 2,
        calificacion: 3,
      };
      await expect(service.crearEvaluacion(badDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
