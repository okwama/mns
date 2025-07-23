import { Controller, Get, Req, UseGuards, Logger } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    Logger.log('[Profile] getProfile endpoint called');
    const authHeader = req.headers['authorization'];
    Logger.log(`[Profile] Authorization header: ${authHeader}`);
    const user = req.user as any;
    Logger.log(`[Profile] Decoded JWT user: ${JSON.stringify(user)}`);
    if (!user) {
      Logger.error('[Profile] No user found in JWT payload');
      throw new Error('User not found');
    }
    const dbUser = await this.userService.findById(user.sub);
    if (!dbUser) {
      Logger.error(`[Profile] No user found in DB for sub: ${user.sub}`);
      throw new Error('User not found');
    }
    Logger.log(`[Profile] DB user: ${JSON.stringify(dbUser)}`);
    return {
      id: dbUser.id,
      username: dbUser.username,
      email: dbUser.email,
      fullName: dbUser.fullName,
      avatarUrl: dbUser.avatarUrl,
      role: dbUser.role,
      isActive: dbUser.isActive,
    };
  }

  @Get('ping')
  ping() {
    return { message: 'pong' };
  }
} 