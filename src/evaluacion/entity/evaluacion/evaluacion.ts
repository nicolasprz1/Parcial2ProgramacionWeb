/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Proyecto } from '../../../proyecto/entity/proyecto/proyecto';
import { Profesor } from '../../../profesores/entity/profesores/profesores';

@Entity()
export class Evaluacion {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'int' })
  calificacion: number;

  @ManyToOne(() => Proyecto, proyecto => proyecto.evaluaciones, { nullable: false })
  proyecto: Proyecto;

  @ManyToOne(() => Profesor, profesor => profesor.evaluacionesComoMentor, { nullable: false })
  mentor: Profesor;

  @ManyToOne(() => Profesor, profesor => profesor.evaluacionesComoEvaluador, { nullable: false })
  evaluador: Profesor;

  
}
