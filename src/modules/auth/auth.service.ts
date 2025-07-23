import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(username: string, email: string, password: string, fullName: string, avatarUrl = '') {
    const existingEmail = await this.userService.findByEmail(email);
    if (existingEmail) throw new ConflictException('Email already in use');
    const existingUsername = await this.userService.findByUsername(username);
    if (existingUsername) throw new ConflictException('Username already in use');
    const user = await this.userService.create(username, email, password, fullName, avatarUrl);
    return { id: user.id, username: user.username, email: user.email, fullName: user.fullName, avatarUrl: user.avatarUrl };
  }

  async login(identifier: string, password: string) {
    // identifier can be email or username
    let user = await this.userService.findByEmail(identifier);
    if (!user) {
      user = await this.userService.findByUsername(identifier);
    }
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, email: user.email, username: user.username, role: user.role };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      avatarUrl: user.avatarUrl,
    };
  }
} 