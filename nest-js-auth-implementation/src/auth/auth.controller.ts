import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorator/public.decorator';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from '../users/dto/SignUp.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

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

    @Patch('change-password')
    @HttpCode(HttpStatus.OK)
    changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
        return this.authService.changePassword(
            req.user.sub,
            changePasswordDto.oldPassword,
            changePasswordDto.newPassword,
        )
    }
}
