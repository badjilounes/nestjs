import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { configService } from './config/config.module';


const typeOrmConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: configService.dbHost,
  port: configService.dbPort,
  username: configService.dbUserName,
  password: configService.dbPassword,
  database: configService.dbName,
  entities: ['src/**/**.entity{.ts,.js}'],
  logging: true,
  synchronize: !configService.isProd
}

@Module({
  imports: [    
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    PatientModule,
    DoctorModule
  ]
})
export class AppModule {}
