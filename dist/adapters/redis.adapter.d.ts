import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server, ServerOptions } from "socket.io";
import { INestApplicationContext } from "@nestjs/common";
export declare class RedisIoAdapter extends IoAdapter {
    constructor(appOrHttpServer: INestApplicationContext);
    private logger;
    private REDIS_HOST;
    private adapterConstructor;
    connectToRedis(): Promise<void>;
    createIOServer(port: number, options?: ServerOptions): Promise<Server>;
}
