/* eslint-disable prettier/prettier */
import { Controller, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { EstudiantesService } from '../estudiantes-service/estudiantes-service.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto/create-estudiante.dto';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  crear(
    @Body() dto: CreateEstudianteDto
  ) {
    return this.estudiantesService.crearEstudiante(dto);
  }

  @Delete(':id')
  eliminar(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.estudiantesService.eliminarEstudiante(id);
  }
}