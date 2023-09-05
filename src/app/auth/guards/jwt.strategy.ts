import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/app/users/users.service';
import { User } from 'src/app/users/entities/user.entity';
import { Role } from '../../../types/general';

export interface JwtPayload {
  sub: string;
  role: Role;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
   
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.secret'),
      passReqToCallback: true,
    });
    
  }

  async validate(req: Request, payload: JwtPayload) {
    let user: User;
    
    try {
      user = await this.usersService.findOne(payload.sub);
      
      if (
        user.allow2fa == true &&
        user.isTwoFactorVerified == false &&
        req.url !== '/v1/auth/2fa-signin' &&
        req.url !== '/v1/2fa/initialize-2fa'
      ) {
        console.log('two factor is not authorized');
        throw new UnauthorizedException('Unauthorized');
      }
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }

    return user;
  }
}
