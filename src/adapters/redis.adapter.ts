import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server, ServerOptions } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { ConfigService } from "@nestjs/config";
import { createClient } from "redis";
import { INestApplicationContext, Logger } from "@nestjs/common";

export class RedisIoAdapter extends IoAdapter {
  constructor(
    appOrHttpServer: INestApplicationContext,
    private readonly configService: ConfigService
  ) {
    super(appOrHttpServer);
  }

  private logger = new Logger("RedisIoAdapter");
  private REDIS_HOST = this.configService.get("REDIS_URL");
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({
      url: this.REDIS_HOST,
    });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);

    this.logger.debug(`Connect to Redis : ${this.REDIS_HOST}`);
  }

  createIOServer(port: number, options?: ServerOptions): Promise<Server> {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);

    this.logger.log(`Create SocketIO Server using redis adapter`);

    return server;
  }
}
