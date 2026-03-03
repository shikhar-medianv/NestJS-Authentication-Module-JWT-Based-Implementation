import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorator/public.decorator';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from '../users/dto/SignUp.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.username, signInDto.password)
    }

    @Public()
    @Post("signup")
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto.username, signUpDto.password);
    }

    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}
