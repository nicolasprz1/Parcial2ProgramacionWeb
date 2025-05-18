import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcialDB',
      synchronize: true,
      autoLoadEntities: true,
    }),
    EstudiantesModule,
    ProfesoresModule,
    ProyectoModule,
    EvaluacionModule,
  ],
})
export class AppModule {}
