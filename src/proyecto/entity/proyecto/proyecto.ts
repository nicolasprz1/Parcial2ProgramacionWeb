/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Estudiante } from 'src/estudiantes/entity/estudiantes/estudiantes';
import { Evaluacion } from 'src/evaluacion/entity/evaluacion/evaluacion';

@Entity()
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  area: string;

  @Column({ type: 'int' })
  presupuesto: number;

  @Column({ type: 'int' })
  notaFinal: number;

  @Column({ type: 'int' })
  estado: number;

  @Column()
  fechaInicio: string;

  @Column()
  fechaFin: string;

  @ManyToMany(() => Estudiante, estudiante => estudiante.proyectos)
  estudiantes: Estudiante[];

  @OneToMany(() => Evaluacion, evaluacion => evaluacion.proyecto)
  evaluaciones: Evaluacion[];
}