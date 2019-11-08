import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';
import { UserDtoConverter } from '../users/converter/userDto.converter';
import { UserDto } from '../users/model/user.dto';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';


@Controller('doctor')
export class DoctorController {

    constructor(
        private readonly userService: UsersService,
        private readonly userDtoConverter: UserDtoConverter
    ) {}

    @UseGuards(AuthGuard('auth'))
    @Get('/patients')
    @ApiResponse({ status: 201, description: 'Doctor patients', type: UserDto, isArray: true})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    @ApiResponse({ status: 404, description: 'User not found'})
    async addDoctor(
        @Request() req,
    ): Promise<UserDto[]> {
        console.log(req.user);
        const patients: User[] = await this.userService.getAllDoctorPatients(req.user.id);
        return this.userDtoConverter.convertOutboundCollection(patients);
    }

}
