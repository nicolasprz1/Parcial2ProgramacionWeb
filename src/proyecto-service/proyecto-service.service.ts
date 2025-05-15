/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from '../estudiantes/entity/estudiantes/estudiantes';
import { Proyecto } from 'src/proyecto/entity/proyecto/proyecto';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepo: Repository<Proyecto>,
    @InjectRepository(Estudiante)
    private readonly estudianteRepo: Repository<Estudiante>,
  ) {}

  async crearProyecto(data: Partial<Proyecto>): Promise<Proyecto> {
    const { presupuesto, titulo } = data;
    if (presupuesto == null || presupuesto <= 0) {
      throw new BadRequestException('Presupuesto debe ser mayor a 0');
    }
    if (!titulo || titulo.length <= 15) {
      throw new BadRequestException(
        'El título debe tener más de 15 caracteres'
      );
    }
    const proyecto = this.proyectoRepo.create(data);
    return this.proyectoRepo.save(proyecto);
  }

  async avanzarProyecto(id: number): Promise<Proyecto> {
    const proyecto = await this.proyectoRepo.findOne({ where: { id } });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');

    if (proyecto.estado >= 4) {
      throw new BadRequestException('El proyecto ya está en estado máximo');
    }
    proyecto.estado += 1;
    return this.proyectoRepo.save(proyecto);
  }

  async findAllEstudiantes(proyectoId: number): Promise<Estudiante[]> {
    const proyecto = await this.proyectoRepo.findOne({
      where: { id: proyectoId },
      relations: ['estudiantes'],
    });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');
    return proyecto.estudiantes;
  }
}
