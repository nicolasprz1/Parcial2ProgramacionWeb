/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, Min, Max } from 'class-validator';

export class CreateEvaluacionDto {
  @IsInt()
  proyectoId: number;

  @IsInt()
  mentorId: number;

  @IsInt()
  evaluadorId: number;

  @IsInt()
  @Min(0, { message: 'La calificación debe ser al menos 0' })
  @Max(5, { message: 'La calificación no puede exceder 5' })
  calificacion: number;
}
