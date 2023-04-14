import { Request  } from 'express';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TwoFactorAuthService } from '../twoFactorAuth.service';
import { User } from '../../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export interface CustomRequest extends Request {
  user: User;
 
}

@Injectable()
export class TwofactorJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-2fa',
) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ConfigService,
    private twoFactorService: TwoFactorAuthService,
  ) {
    console.log('two factor strategy');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.secret'),
      passReqToCallback: true,
    });
  }

  async validate(req: CustomRequest, payload: any) {
    let body = req.body as unknown as { token: string };

    const isValidToken = await this.twoFactorService.verify2faToken(
      body.token,
      req.user,
    );

    console.log(isValidToken);
    const user: User = await this.userRepository.findOne({
      where: { id: payload.sub },
    });
    if (isValidToken == false) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    // update user  2fa state

    return await this.userRepository.save({
      ...user,
      isTwoFactorVerified: true,
    });
  }
}
