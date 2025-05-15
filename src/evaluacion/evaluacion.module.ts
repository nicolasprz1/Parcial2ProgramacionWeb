/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluacion } from './entity/evaluacion/evaluacion';
import { Proyecto } from 'src/proyecto/entity/proyecto/proyecto';
import { Profesor } from 'src/profesores/entity/profesores/profesores';
import { EvaluacionService } from 'src/evaluacion-service/evaluacion-service.service';


@Module({
  imports: [TypeOrmModule.forFeature([Evaluacion, Proyecto, Profesor])],
  providers: [EvaluacionService],
  controllers: [],
  exports: [EvaluacionService],
})
export class EvaluacionModule {}