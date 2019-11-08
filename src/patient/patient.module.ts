import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PatientController } from './patient.controller';

@Module({
  imports: [UsersModule],
  controllers: [PatientController],
})
export class PatientModule {}
