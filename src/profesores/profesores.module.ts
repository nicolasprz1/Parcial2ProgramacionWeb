/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './entity/profesores/profesores';
import { Evaluacion } from 'src/evaluacion/entity/evaluacion/evaluacion';
import { ProfesoresService } from 'src/profesor-service/profesor-service.service';
import { ProfesoresController } from './profesores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Profesor, Evaluacion])],
  providers: [ProfesoresService],
  controllers: [ProfesoresController],
  exports: [ProfesoresService],
})
export class ProfesoresModule {}