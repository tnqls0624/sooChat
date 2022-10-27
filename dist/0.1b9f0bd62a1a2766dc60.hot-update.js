"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 70:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisIoAdapter = void 0;
const platform_socket_io_1 = __webpack_require__(71);
const redis_adapter_1 = __webpack_require__(72);
const redis_1 = __webpack_require__(73);
const common_1 = __webpack_require__(6);
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


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2e6dcad0c8c9561f34eb")
/******/ })();
/******/ 
/******/ }
;