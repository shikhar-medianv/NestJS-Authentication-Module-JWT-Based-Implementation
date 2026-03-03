import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(
        username: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(username);
        if (!user || !(await bcrypt.compare(pass, user.password))) {
            throw new UnauthorizedException('Invalid username or password');
        }
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(username: string, pass: string): Promise<any> {
        const existingUser = await this.usersService.findOne(username);
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(pass, 10);
        const user = await this.usersService.create({
            username,
            password: hashedPassword,
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
    }


    async changePassword(userId: number, Pass: string, newPass: string): Promise<any> {
        const user = await this.usersService.findById(userId)
        if (!user) {
            throw new UnauthorizedException("User not found")
        }
        const isMatch = await bcrypt.compare(Pass, user.password)
        if (!isMatch) {
            throw new UnauthorizedException("Invalid current password")
        }
        const hashedNewPassword = await bcrypt.hash(newPass, 10)
        await this.usersService.update(userId, { password: hashedNewPassword })
        return { message: 'Password changed successfully' }
    }
}
