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
import { JWT } from './constant';
import { Jwt } from './providers/jwt.provider';

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
    @Inject(JWT)
    private readonly jwtService: Jwt,
  ) {}

  @WebSocketServer() server: Server;

  @UseGuards(WsGuard)
  @SubscribeMessage('update-design')
  async handleDesign(client: ExtendedSocket, payload: any): Promise<void> {
    const user: User = client.user;
    console.log(user);
    await this.designService.design(user, payload);
    client.to(user.id).emit('updated-design', payload);
  }

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
