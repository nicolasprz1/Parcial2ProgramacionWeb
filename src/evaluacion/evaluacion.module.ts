/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluacion } from './entity/evaluacion/evaluacion';
import { Proyecto } from 'src/proyecto/entity/proyecto/proyecto';
import { Profesor } from 'src/profesores/entity/profesores/profesores';
import { EvaluacionService } from 'src/evaluacion-service/evaluacion-service.service';
import { EvaluacionController } from './evaluacion.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Evaluacion, Proyecto, Profesor])],
  providers: [EvaluacionService],
  controllers: [EvaluacionController],
  exports: [EvaluacionService],
})
export class EvaluacionModule {}