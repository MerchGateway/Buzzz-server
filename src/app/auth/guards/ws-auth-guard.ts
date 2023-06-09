import { Injectable } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { UsersService } from 'src/app/users/users.service';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { ExecutionContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { User } from 'src/app/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    //   extend client
    class ExtendedSocket extends Socket {
      user: User;
    }
    const client: ExtendedSocket = context
      .switchToWs()
      .getClient<ExtendedSocket>();

    const bearerToken = client.handshake.headers.authorization.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(
        bearerToken,
        this.configService.get('jwt.secret'),
      ) as any;
      if (typeof decoded?.sub === 'undefined') {
        return false;
      }

      const user: any = this.userService.findOne(decoded.sub);

      //  add user to socket header
      client.user = user;
      //   context.switchToHttp().getRequest().user = user;

      return Boolean(user);
    } catch (err) {
      throw new WsException(err.message);
    }
  }
}
