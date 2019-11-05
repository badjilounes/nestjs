import { CreateUserDto } from "../model/createUser.dto";
import { User } from "../user.entity";
import { Converter } from "src/common/converter";

export class CreateUserDtoConverter implements Converter<CreateUserDto, Partial<User>>{
    
    constructor() {}

    convertInbound(user: CreateUserDto): Partial<User> {
        return {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            role: user.role,
            password: user.password,
            patients: [],
            doctors: []
        }
    }
}