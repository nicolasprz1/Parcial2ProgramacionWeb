import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './estudiantes/entity/estudiantes/estudiantes';
import { Profesor } from './profesores/entity/profesores/profesores';
import { Proyecto } from './proyecto/entity/proyecto/proyecto';
import { Evaluacion } from './evaluacion/entity/evaluacion/evaluacion';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Estudiante, Profesor, Proyecto, Evaluacion],
      synchronize: true,
    }),
    EstudiantesModule,
    ProfesoresModule,
    ProyectoModule,
    EvaluacionModule,
  ],
})
export class AppModule {}
