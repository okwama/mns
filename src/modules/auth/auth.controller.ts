import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

class RegisterDto {
  username: string;
  email: string;
  password: string;
  fullName: string;
  avatarUrl?: string;
}

class LoginDto {
  identifier: string; // username or email
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.username, dto.email, dto.password, dto.fullName, dto.avatarUrl);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    Logger.log(`[Login] Incoming login request: ${JSON.stringify(dto)}`);
    const result = await this.authService.login(dto.identifier, dto.password);
    Logger.log(`[Login] Login response: ${JSON.stringify(result)}`);
    return result;
  }
} 