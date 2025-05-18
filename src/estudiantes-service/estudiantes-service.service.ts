/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from 'src/estudiantes/entity/estudiantes/estudiantes';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudiantesRepo: Repository<Estudiante>,
    
  ) {}

  async crearEstudiante(data: Partial<Estudiante>): Promise<Estudiante> {
    const { promedio, semestre } = data;
    if (promedio == null || promedio <= 3.2 || semestre == null || semestre < 4) {
      throw new BadRequestException(
        'Promedio debe ser > 3.2 y semestre >= 4'
      );
    }
    const est = this.estudiantesRepo.create(data);
    return this.estudiantesRepo.save(est);
  }

  /** Eliminar Estudiante: no debe tener proyectos activos (estado < 4) */
  async eliminarEstudiante(id: number): Promise<void> {
    const estudiante = await this.estudiantesRepo.findOne({
      where: { id },
      relations: ['proyectos'],
    });
    if (!estudiante) throw new NotFoundException('Estudiante no encontrado');

    const activos = estudiante.proyectos.filter(p => p.estado < 4);
    if (activos.length > 0) {
      throw new BadRequestException(
        'No se puede eliminar estudiante con proyectos activos'
      );
    }

    await this.estudiantesRepo.delete(id);
  }
}

