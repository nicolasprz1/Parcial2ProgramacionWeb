/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsString, IsBoolean } from 'class-validator';

export class CreateProfesorDto {
  @IsInt()
  cedula: number;

  @IsString()
  nombre: string;

  @IsString()
  departamento: string;

  @IsInt()
  extension: number;

  @IsBoolean()
  esParEvaluador: boolean;
}
