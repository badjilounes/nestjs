import { UserDto } from '../model/user.dto';
import { User } from '../user.entity';
import { Converter } from 'src/common/converter';

export class UserDtoConverter implements Converter<UserDto, User>{
    constructor() {}

    convertInbound(user: UserDto): User {
        return {
            id: user.id,
            email: user.email,
            address: user.address,
            firstName: user.firstName,
            gender: user.gender,
            lastName: user.lastName,
            role: user.role,
            patients: this.convertInboundCollection(user.patients),
            doctors: this.convertInboundCollection(user.doctors)
        } as User;
    }

    convertInboundCollection(users: UserDto[]): User[] {
        return users.map((user) => this.convertInbound(user));
    }

    convertOutbound(user: User): UserDto {
        return {
            id: user.id,
            address: user.address,
            email: user.email,
            firstName: user.firstName,
            gender: user.gender,
            lastName: user.lastName,
            role: user.role,
            patients: user.patients,
            doctors: user.doctors
        };
    }

    convertOutboundCollection(users: User[]): UserDto[] {
        return users.map((user) => this.convertOutbound(user));
    }
}