import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Inject, UseGuards } from '@nestjs/common';

import { Socket, Server } from 'socket.io';
import { DesignService } from './app/design/design.service';
import { User } from './app/users/entities/user.entity';
import { WsGuard } from './app/auth/guards/ws-auth-guard';
import { DESIGN_MERCH, DESIGN_ERROR, SOCKET_CONNECT } from './constant';
import { JWT } from './constant';
import { Jwt } from './providers/jwt.provider';
import { UsersService } from './app/users/users.service';
import { Job } from 'bull';
import { Design } from './app/design/entities/design.entity';

class ExtendedSocket extends Socket {
  user: User;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly designService: DesignService,
    private readonly userService: UsersService,
    @Inject(JWT)
    private readonly jwtService: Jwt,
  ) {}

  @WebSocketServer() server: Server;

  // @UseGuards(WsGuard)
  @SubscribeMessage(DESIGN_MERCH)
  async handleDesign(client: ExtendedSocket, payload: any): Promise<void> {
    let tke = client.handshake.headers.authorization
      ? client.handshake.headers.authorization.split(' ')[1]
      : null;
    console.log('entered socket file');
    // const user: User = client.user;
    let user: User;
    let response: Job<Design>;

    try {
      if (tke) {
        const jwtRes = await this.jwtService.verifyToken(tke);

        user = await this.userService.findOne(jwtRes.sub);
        response = await this.designService.design(
          payload,
          user,
          client.handshake.query.id as string,
        );
        this.server.to(user.id).emit(DESIGN_MERCH, await response.finished());
      } else {
        response = await this.designService.design(
          payload,
          null,
          client.handshake.query.id as string,
        );
        this.server.to(client.id).emit(DESIGN_MERCH, await response.finished());
      }
    } catch (error) {
      console.log('error from socket', error);
      this.server
        .to(client.id)
        .emit(
          DESIGN_ERROR,
          error.message ? error.message : 'Could not create or update design',
        );
    }
  }

  // @UseGuards(WsGuard)
  // @SubscribeMessage('contribute-to-design')
  // async contributeToDesign(
  //   client: ExtendedSocket,
  //   payload: any,
  // ): Promise<void> {
  //   // const user: User = client.user;
  //   const response = await this.jwtService.verifyToken(
  //     client.handshake.headers.authorization.split(' ')[1],
  //   );

  //   const user: User = await this.userService.findOne(response.sub);
  //   await this.designService.contributeToDesign(
  //     user,
  //     payload,
  //     client.handshake.query.id as string,
  //   );
  //   client.to(user.id).emit('contribute-to-design', payload);
  // }

  afterInit(server: Server) {
    console.log('server initialized');
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  async handleConnection(client: ExtendedSocket, ...args: any[]) {
    try {
      let tke = client.handshake.headers.authorization
        ? client.handshake.headers.authorization.split(' ')[1]
        : null;
      if (tke) {
        const payload = await this.jwtService.verifyToken(tke);
        // join private room
        client.join(payload?.sub);
        console.log(client.rooms);
        console.log(`Connected ${client.id}`);
        this.server.to(payload.sub).emit(SOCKET_CONNECT, { connected: true });
      } else {
        this.server.to(client.id).emit(SOCKET_CONNECT, { connected: true });
      }
    } catch (error) {
      client.disconnect(true);
    }
  }
}
