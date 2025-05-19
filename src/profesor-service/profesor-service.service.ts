/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from '../profesores/entity/profesores/profesores';
import { Evaluacion } from '../evaluacion/entity/evaluacion/evaluacion';

@Injectable()
export class ProfesoresService {
  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepo: Repository<Profesor>,
    @InjectRepository(Evaluacion)
    private readonly evaluacionRepo: Repository<Evaluacion>,
  ) {}

  async crearProfesor(data: { extension: number } & any): Promise<any> {
    // Asegúrate de esta línea:
    if (!/^[0-9]{5}$/.test(String(data.extension))) {
      throw new BadRequestException('La extensión debe tener exactamente 5 dígitos');
    }
    // Si llega aquí, extension es exactamente 5 dígitos
    const prof = this.profesorRepo.create(data);
    return this.profesorRepo.save(prof);
  }

  async asignarEvaluador(
    profesorId: number,
    evaluacionId: number,
  ): Promise<Evaluacion> {
    const profesor = await this.profesorRepo.findOne({
      where: { id: profesorId },
      relations: ['evaluacionesComoEvaluador'],
    });
    if (!profesor) throw new NotFoundException('Profesor no encontrado');

    if ((profesor.evaluacionesComoEvaluador?.length ?? 0) >= 3) {
      throw new BadRequestException(
        'El profesor ya tiene 3 evaluaciones asignadas'
      );
    }

    const evalua = await this.evaluacionRepo.findOne({
      where: { id: evaluacionId },
    });
    if (!evalua) throw new NotFoundException('Evaluación no encontrada');

    evalua.evaluador = profesor;
    return this.evaluacionRepo.save(evalua);
  }
}
