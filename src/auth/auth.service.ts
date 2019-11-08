import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/model/user.dto';
import { UserDtoConverter } from '../users/converter/userDto.converter';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService, 
        private readonly jwtService: JwtService,
        private readonly userDtoConverter: UserDtoConverter
    ) {}

    async login(username: string, password: string): Promise<any> {
        const user: UserDto = this.userDtoConverter.convertOutbound(
            await this.userService.checkUserCredentials(username, password)
        );
            
        return {
            access_token: this.jwtService.sign(user)
        };
    }

    async validate(userId: number): Promise<User> {
        return await this.userService.getUserById(userId);
    }
}
