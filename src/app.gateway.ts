import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { DesignService } from './app/design/design.service';
import { User } from './app/users/entities/user.entity';
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
    const tke = client.handshake.headers.authorization
      ? client.handshake.headers.authorization.split(' ')[1]
      : null;
    // const user: User = client.user;
    let user: User;
    let response: Job<Design>;

    try {
      if (tke) {
        const jwtRes = await this.jwtService.verifyToken(tke);

        user = await this.userService.findOneProfile(jwtRes.sub);
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

  afterInit(_server: Server) {
    const dateString = new Date().toLocaleString();
    const message = `[WebSocket] ${process.pid} - ${dateString} LOG [WebSocketServer] Websocket server successfully started`;
    console.log(message);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  async handleConnection(client: ExtendedSocket, ...args: any[]) {
    try {
      const tke = client.handshake.headers.authorization
        ? client.handshake.headers.authorization.split(' ')[1]
        : null;
      if (tke) {
        const payload = await this.jwtService.verifyToken(tke);
        // join private room
        client.join(payload?.sub);
        this.server.to(payload.sub).emit(SOCKET_CONNECT, { connected: true });
      } else {
        this.server.to(client.id).emit(SOCKET_CONNECT, { connected: true });
      }
    } catch (error) {
      client.disconnect(true);
    }
  }
}
