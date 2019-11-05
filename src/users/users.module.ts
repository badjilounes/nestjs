import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDtoConverter } from './converter/userDto.converter';
import { CreateUserDtoConverter } from './converter/createUserDto.converter';
import { UpdateUserDtoConverter } from './converter/updateUserDto.converter';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService, 
    UserDtoConverter,
    CreateUserDtoConverter,
    UpdateUserDtoConverter
  ],
  controllers: [UsersController],
  exports: [
    UsersService,
    UserDtoConverter,
    CreateUserDtoConverter,
  ]
})
export class UsersModule {}
