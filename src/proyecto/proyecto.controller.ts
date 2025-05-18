/* eslint-disable prettier/prettier */
import { Controller, Post, Patch, Get, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProyectoService } from '../proyecto-service/proyecto-service.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto/create-proyecto.dto';

@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  crear(
    @Body() dto: CreateProyectoDto
  ) {
    return this.proyectoService.crearProyecto(dto);
  }

  @Patch(':id/avanzar')
  avanzar(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.proyectoService.avanzarProyecto(id);
  }

  @Get(':id/estudiantes')
  obtenerEstudiantes(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.proyectoService.findAllEstudiantes(id);
  }
}