import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';



@Module({
  imports: [    
    TypeOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    PatientModule,
    DoctorModule
  ]
})
export class AppModule {}
