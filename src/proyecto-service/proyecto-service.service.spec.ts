/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProyectoService } from './proyecto-service.service';
import { Proyecto } from '../proyecto/entity/proyecto/proyecto';
import { Estudiante } from '../estudiantes/entity/estudiantes/estudiantes';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let projRepo: Repository<Proyecto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProyectoService,
        { provide: getRepositoryToken(Proyecto), useValue: { create: jest.fn(), save: jest.fn(), findOne: jest.fn() } },
        { provide: getRepositoryToken(Estudiante), useValue: {} },
      ],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    projRepo = module.get(getRepositoryToken(Proyecto));
  });

  describe('crearProyecto', () => {
    it('Caso positivo: presupuesto>0 y título largo', async () => {
      const dto = { presupuesto: 100, titulo: 'Proyecto muy interesante' } as any;
      (projRepo.create as jest.Mock).mockReturnValue(dto);
      (projRepo.save as jest.Mock).mockResolvedValue({ id: 1, ...dto });

      await expect(service.crearProyecto(dto)).resolves.toEqual({ id: 1, ...dto });
    });

    it('Caso negativo: presupuesto inválido', async () => {
      await expect(service.crearProyecto({ presupuesto: 0, titulo: 'Título válido pero' } as any))
        .rejects.toThrow(BadRequestException);
    });
  });

  describe('avanzarProyecto', () => {
    it('Caso positivo: avanza estado', async () => {
      const proj = { id: 1, estado: 2 } as any;
      (projRepo.findOne as jest.Mock).mockResolvedValue(proj);
      (projRepo.save as jest.Mock).mockResolvedValue({ ...proj, estado: 3 });

      await expect(service.avanzarProyecto(1)).resolves.toEqual({ ...proj, estado: 3 });
    });

    it('Caso negativo: ya en máximo estado', async () => {
      const proj = { id: 1, estado: 4 } as any;
      (projRepo.findOne as jest.Mock).mockResolvedValue(proj);

      await expect(service.avanzarProyecto(1)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAllEstudiantes', () => {
    it('Caso positivo: retorna estudiantes', async () => {
      const proj = { id: 1, estudiantes: [{ id: 1 }] } as any;
      (projRepo.findOne as jest.Mock).mockResolvedValue(proj);

      await expect(service.findAllEstudiantes(1)).resolves.toEqual([{ id: 1 }]);
    });

    it('Caso negativo: proyecto no existe', async () => {
      (projRepo.findOne as jest.Mock).mockResolvedValue(undefined);

      await expect(service.findAllEstudiantes(1)).rejects.toThrow(NotFoundException);
    });
  });
});