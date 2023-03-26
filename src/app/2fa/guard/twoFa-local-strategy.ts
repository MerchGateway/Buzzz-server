import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { twoFactorAuthService } from '../twoFactorAuth.service';
import { User } from 'src/app/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

class CustomRequest extends Request {
  user: User;
}

@Injectable()
export class TwofaLocalStrategy extends PassportStrategy(Strategy,'jwt-two-factor') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private twoFactorService: twoFactorAuthService,
  ) {
    super({ token: 'token', passReqToCallback: true });
  }

  async validate(req: CustomRequest, token: string) {
    const isValidToken = await this.twoFactorService.verify2faToken(
      token,
      req.user,
    );

    if (!isValidToken) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    const user: User = await this.userRepository.findOne({
      where: { id: req.user.id },
    });

    // update user  2fa state
    user.twoFactorAuthentication.isTwoFactorVerified = true;
    return await this.userRepository.save(user);
  }
}
