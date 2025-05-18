/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Proyecto } from '../../../proyecto/entity/proyecto/proyecto';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  cedula: number;

  @Column()
  nombre: string;

  @Column({ type: 'int' })
  semestre: number;

  @Column()
  programa: string;

  @Column({ type: 'int' })
  promedio: number;

  @ManyToMany(() => Proyecto, proyecto => proyecto.estudiantes)
  @JoinTable()
  proyectos: Proyecto[];

  
}
