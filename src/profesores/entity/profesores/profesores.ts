/* eslint-disable prettier/prettier */
// src/entities/profesor.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Long } from 'typeorm';
import { Evaluacion } from '../../../evaluacion/entity/evaluacion/evaluacion';

@Entity()
export class Profesor {
  @PrimaryGeneratedColumn()
  id: Long;

  @Column({ type: 'int' })
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  departamento: string;

  @Column({ type: 'int' })
  extension: number;

  @Column({ type: 'boolean' })
  esParEvaluador: boolean;

  @OneToMany(() => Evaluacion, evalua => evalua.mentor)
  evaluacionesComoMentor: Evaluacion[];

  @OneToMany(() => Evaluacion, evalua => evalua.evaluador)
  evaluacionesComoEvaluador: Evaluacion[];
}
