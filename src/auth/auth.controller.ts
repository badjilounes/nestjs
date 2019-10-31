import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './model/login.dto';
import { SignupDto } from './model/signup.dto';

@Controller('auth')
export class AuthController {

    constructor() {}

    @Post('login')
    login(@Body() auth: LoginDto) {
        
    }

    @Post('signup')
    update(@Body() user: SignupDto) {

    }

}
