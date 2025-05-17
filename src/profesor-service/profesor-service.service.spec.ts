/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfesoresService } from './profesor-service.service';
import { Profesor } from 'src/profesores/entity/profesores/profesores';
import { Evaluacion } from 'src/evaluacion/entity/evaluacion/evaluacion';
import { Repository } from 'typeorm';
import { BadRequestException} from '@nestjs/common';

describe('ProfesoresService', () => {
  let service: ProfesoresService;
  let profRepo: Repository<Profesor>;
  let evalRepo: Repository<Evaluacion>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfesoresService,
        { provide: getRepositoryToken(Profesor), useValue: { findOne: jest.fn(), create: jest.fn(), save: jest.fn() } },
        { provide: getRepositoryToken(Evaluacion), useValue: { findOne: jest.fn(), save: jest.fn() } },
      ],
    }).compile();

    service = module.get<ProfesoresService>(ProfesoresService);
    profRepo = module.get(getRepositoryToken(Profesor));
    evalRepo = module.get(getRepositoryToken(Evaluacion));
  });

  describe('crearProfesor', () => {
    it('Caso positivo: extensión de 5 dígitos', async () => {
      const dto = { extension: 12345 } as Profesor;
      (profRepo.create as jest.Mock).mockReturnValue(dto);
      (profRepo.save as jest.Mock).mockResolvedValue({ ...dto, id: 1 });

      await expect(service.crearProfesor(dto)).resolves.toEqual({ ...dto, id: 1 });
    });

    it('Caso negativo: extensión inválida', async () => {
      await expect(service.crearProfesor({ extension: 123 } as any))
        .rejects.toThrow(BadRequestException);
    });
  });

  describe('asignarEvaluador', () => {
    it('Caso positivo: menos de 3 evaluaciones', async () => {
      const prof = { id: 1, evaluacionesComoEvaluador: [] } as any;
      const evalua = { id: 2 } as any;
      (profRepo.findOne as jest.Mock).mockResolvedValue(prof);
      (evalRepo.findOne as jest.Mock).mockResolvedValue(evalua);
      (evalRepo.save as jest.Mock).mockResolvedValue({ ...evalua, evaluador: prof });

      await expect(service.asignarEvaluador(1, 2)).resolves.toEqual({ ...evalua, evaluador: prof });
    });

    it('Caso negativo: ya tiene 3 evaluaciones', async () => {
      const prof = { id: 1, evaluacionesComoEvaluador: [1,2,3] } as any;
      (profRepo.findOne as jest.Mock).mockResolvedValue(prof);

      await expect(service.asignarEvaluador(1, 2)).rejects.toThrow(BadRequestException);
    });
  });
});
