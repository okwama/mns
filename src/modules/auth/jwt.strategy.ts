import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log('[JWT Strategy] Secret:', process.env.JWT_SECRET);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || '',
    });
  }

  async validate(payload: any) {
    console.log('[JWT Strategy] Validate called. Payload:', payload);
    // Attach user info to request
    return { sub: payload.sub, email: payload.email, username: payload.username, role: payload.role };
  }
}
