/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { EvaluacionService } from 'src/evaluacion-service/evaluacion-service.service';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto/create-evaluacion.dto';

@Controller('evaluaciones')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Post()
  crear(
    @Body() dto: CreateEvaluacionDto
  ) {
    return this.evaluacionService.crearEvaluacion(dto);
  }
}