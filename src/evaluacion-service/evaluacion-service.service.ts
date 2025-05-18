/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from '../proyecto/entity/proyecto/proyecto';
import { Profesor } from '../profesores/entity/profesores/profesores';
import { Evaluacion } from '../evaluacion/entity/evaluacion/evaluacion';
@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Evaluacion)
    private readonly evaluacionRepo: Repository<Evaluacion>,
    @InjectRepository(Proyecto)
    private readonly proyectoRepo: Repository<Proyecto>,
    @InjectRepository(Profesor)
    private readonly profesorRepo: Repository<Profesor>,
  ) {}

  async crearEvaluacion(data: {
    proyectoId: number;
    mentorId: number;
    evaluadorId: number;
    calificacion: number;
  }): Promise<Evaluacion> {
    const { proyectoId, mentorId, evaluadorId, calificacion } = data;

    if (mentorId === evaluadorId) {
      throw new BadRequestException(
        'El evaluador no puede ser el mismo que el mentor'
      );
    }
    if (calificacion < 0 || calificacion > 5) {
      throw new BadRequestException(
        'La calificación debe estar entre 0 y 5'
      );
    }

    const proyecto = await this.proyectoRepo.findOne({ where: { id: proyectoId } });
    if (!proyecto) throw new NotFoundException('Proyecto no encontrado');

    const mentor = await this.profesorRepo.findOne({ where: { id: mentorId } });
    if (!mentor) throw new NotFoundException('Profesor mentor no encontrado');

    const evaluador = await this.profesorRepo.findOne({ where: { id: evaluadorId } });
    if (!evaluador) throw new NotFoundException('Profesor evaluador no encontrado');

    const evalua = this.evaluacionRepo.create({
      proyecto: proyecto,
      mentor: mentor,
      evaluador: evaluador,
      calificacion: calificacion,
    });
    return this.evaluacionRepo.save(evalua);
  }
}
