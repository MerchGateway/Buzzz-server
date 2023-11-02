import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketIO from 'socket.io';

export class CustomWebSocketAdapter extends IoAdapter {
  createIOServer(
    port: number,
    options?: socketIO.ServerOptions,
  ): socketIO.Server {
    const server = super.createIOServer(port, options);

    // Set the maxHttpBufferSize option
    if (options.maxHttpBufferSize) {
      server.httpServer.maxHttpBufferSize = options.maxHttpBufferSize;
    }

    return server;
  }
}
