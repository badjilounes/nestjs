import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [DoctorController]
})
export class DoctorModule {}
