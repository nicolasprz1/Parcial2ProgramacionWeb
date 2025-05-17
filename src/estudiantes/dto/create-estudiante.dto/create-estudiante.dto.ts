/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsString, IsNumber, Min } from 'class-validator';

export class CreateEstudianteDto {
  @IsInt()
  cedula: number;

  @IsString()
  nombre: string;

  @IsInt()
  @Min(4, { message: 'El semestre debe ser al menos 4' })
  semestre: number;

  @IsString()
  programa: string;

  @IsNumber()
  @Min(3.21, { message: 'El promedio debe ser mayor a 3.2' })
  promedio: number;
}
