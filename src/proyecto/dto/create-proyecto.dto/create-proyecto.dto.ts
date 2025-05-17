/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber, Min, MinLength, IsDateString, IsInt } from 'class-validator';

export class CreateProyectoDto {
  @IsString()
  @MinLength(16, { message: 'El título debe tener más de 15 caracteres' })
  titulo: string;

  @IsString()
  area: string;

  @IsNumber()
  @Min(1, { message: 'El presupuesto debe ser mayor a 0' })
  presupuesto: number;

  @IsInt()
  notaFinal: number;

  @IsInt()
  estado: number;

  @IsDateString()
  fechaInicio: string;

  @IsDateString()
  fechaFin: string;
}
