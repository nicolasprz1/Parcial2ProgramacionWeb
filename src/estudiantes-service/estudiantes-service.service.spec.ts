/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudiantesService } from './estudiantes-service.service';
import { Estudiante } from 'src/estudiantes/entity/estudiantes/estudiantes';
import { Proyecto } from 'src/proyecto/entity/proyecto/proyecto';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('EstudiantesService', () => {
  let service: EstudiantesService;
  let estRepo: Repository<Estudiante>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudiantesService,
        { provide: getRepositoryToken(Estudiante), useValue: { create: jest.fn(), save: jest.fn(), findOne: jest.fn(), delete: jest.fn() } },
        { provide: getRepositoryToken(Proyecto), useValue: {} },
      ],
    }).compile();

    service = module.get<EstudiantesService>(EstudiantesService);
    estRepo = module.get(getRepositoryToken(Estudiante));
  });

  describe('crearEstudiante', () => {
    it('Caso positivo: crea cuando promedio>3.2 y semestre>=4', async () => {
      const dto = { promedio: 3.5, semestre: 4 } as Estudiante;
      (estRepo.create as jest.Mock).mockReturnValue(dto);
      (estRepo.save as jest.Mock).mockResolvedValue({ ...dto, id: 1 });

      await expect(service.crearEstudiante(dto)).resolves.toEqual({ ...dto, id: 1 });
    });

    it('Caso negativo: error si promedio <= 3.2', async () => {
      await expect(service.crearEstudiante({ promedio: 3.0, semestre: 4 } as any))
        .rejects.toThrow(BadRequestException);
    });
  });

  describe('eliminarEstudiante', () => {
    it('Caso positivo: elimina sin proyectos activos', async () => {
      const estudiante = { id: 1, proyectos: [{ estado: 4 }] } as any;
      (estRepo.findOne as jest.Mock).mockResolvedValue(estudiante);
      (estRepo.delete as jest.Mock).mockResolvedValue(undefined);

      await expect(service.eliminarEstudiante(1)).resolves.toBeUndefined();
    });

    it('Caso negativo: error si tiene proyectos activos', async () => {
      const estudiante = { id: 1, proyectos: [{ estado: 3 }] } as any;
      (estRepo.findOne as jest.Mock).mockResolvedValue(estudiante);

      await expect(service.eliminarEstudiante(1)).rejects.toThrow(BadRequestException);
    });
  });
});
