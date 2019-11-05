import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) {}

    async login(username: string, password: string): Promise<any> {
        const user: User = await this.userService.checkUserCredentials(username, password);
        return {
            access_token: this.jwtService.sign({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                address: user.address,
                role: user.role,
                gender: user.gender
            })
        };
    }

    async validate(userId: number): Promise<User> {
        return await this.userService.getUserById(userId);
    }
}
