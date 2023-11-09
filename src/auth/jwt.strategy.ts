import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secrete',
    });
  }

  async validate(payload) {
    return {
      id_user: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      unit: payload.unit,
    };
  }
}
