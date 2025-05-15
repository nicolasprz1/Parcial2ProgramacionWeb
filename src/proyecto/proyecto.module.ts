/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './entity/proyecto/proyecto';
import { Estudiante } from 'src/estudiantes/entity/estudiantes/estudiantes';
import { ProyectoService } from 'src/proyecto-service/proyecto-service.service';


@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Estudiante])],
  providers: [ProyectoService],
  controllers: [],
  exports: [ProyectoService],
})
export class ProyectoModule {}