import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiImplicitBody, ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { CheckCredentialDto } from '../users/model/checkCredential.dto';
import { UserDto } from '../users/model/user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { TokenDto } from './model/token.dto';
import { UserDtoConverter } from '../users/converter/userDto.converter';
import { CreateUserDtoConverter } from '../users/converter/createUserDto.converter';
import { CreateUserDto } from '../users/model/createUser.dto';
import { User } from '../users/user.entity';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UsersService, 
        private readonly authService: AuthService,
        private readonly userDtoConverter: UserDtoConverter,
        private readonly createUserDtoConverter: CreateUserDtoConverter
    ) {}

    @Post('login')
    @ApiImplicitBody({name: 'CheckCredentialDto', description: 'User credential to check', type: CheckCredentialDto})
    @ApiResponse({status: 201, description: 'User authentificated token', type: TokenDto})
    async login(@Body() auth: CheckCredentialDto): Promise<TokenDto> {
        return this.authService.login(auth.email, auth.password);
    }

    @Put('signup')
    @ApiImplicitBody({name: 'UserDto', description: 'User to create', type: UserDto})
    async signup(@Body() user: CreateUserDto): Promise<UserDto> {
        const userToCreate: Partial<User> = this.createUserDtoConverter.convertInbound(user)
        const userCreated: User = await this.userService.createUser(userToCreate);
        return this.userDtoConverter.convertOutbound(userCreated);
    }
}
