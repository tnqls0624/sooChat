"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisIoAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const redis_1 = require("redis");
const common_1 = require("@nestjs/common");
class RedisIoAdapter extends platform_socket_io_1.IoAdapter {
    constructor(appOrHttpServer) {
        super(appOrHttpServer);
        this.logger = new common_1.Logger("RedisIoAdapter");
        this.REDIS_HOST = "redis://default:redispw@localhost:55000";
    }
    async connectToRedis() {
        const pubClient = (0, redis_1.createClient)({
            url: this.REDIS_HOST,
        });
        const subClient = pubClient.duplicate();
        await Promise.all([pubClient.connect(), subClient.connect()]);
        this.adapterConstructor = (0, redis_adapter_1.createAdapter)(pubClient, subClient);
        this.logger.debug(`Connect to Redis : ${this.REDIS_HOST}`);
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        server.adapter(this.adapterConstructor);
        this.logger.log(`Create SocketIO Server using redis adapter`);
        return server;
    }
}
exports.RedisIoAdapter = RedisIoAdapter;
//# sourceMappingURL=redis.adapter.js.map