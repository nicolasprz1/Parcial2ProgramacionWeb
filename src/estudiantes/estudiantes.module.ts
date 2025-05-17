/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entity/estudiantes/estudiantes';
import { EstudiantesService } from 'src/estudiantes-service/estudiantes-service.service';
import { EstudiantesController } from './estudiantes.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Estudiante])],
  providers: [EstudiantesService],
  controllers: [EstudiantesController],
  exports: [EstudiantesService],
})
export class EstudiantesModule {}