/* eslint-disable prettier/prettier */
import { Controller, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProfesoresService } from 'src/profesor-service/profesor-service.service';
import { CreateProfesorDto } from './dto/create-profesor.dto/create-profesor.dto';
import { AsignarEvaluadorDto } from './dto/asignar-evaluador.dto/asignar-evaluador.dto';

@Controller('profesores')
export class ProfesoresController {
  constructor(private readonly profesoresService: ProfesoresService) {}

  @Post()
  crear(
    @Body() dto: CreateProfesorDto
  ) {
    return this.profesoresService.crearProfesor(dto);
  }

  @Post(':id/evaluaciones')
  asignarEvaluacion(
    @Param('id', ParseIntPipe) profesorId: number,
    @Body() body: AsignarEvaluadorDto
  ) {
    return this.profesoresService.asignarEvaluador(profesorId, body.evaluacionId);
  }
}