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
import {DESIGN_MERCH} from "./constant"
import { JWT } from './constant';
import { Jwt } from './providers/jwt.provider';
import { UsersService } from './app/users/users.service';

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
    // const user: User = client.user;
    const response = await this.jwtService.verifyToken(
      client.handshake.headers.authorization.split(' ')[1],
    );

    const user: User = await this.userService.findOne(response.sub);
    await this.designService.design(
      user,
      payload,
      client.handshake.query.id as string,
    );
    client.to(user.id).emit('design-merch', payload);
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
    console.log('server initialized', server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  async handleConnection(client: ExtendedSocket, ...args: any[]) {
    try {
      const payload = await this.jwtService.verifyToken(
        client.handshake.headers.authorization.split(' ')[1],
      );
      // join private room
      client.join(payload?.sub);
      console.log(`Connected ${client.id}`);
    } catch (error) {
      client.disconnect(true);
    }
  }
}
