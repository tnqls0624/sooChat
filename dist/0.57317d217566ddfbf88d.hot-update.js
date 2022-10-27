"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 65:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisIoAdapter = void 0;
const platform_socket_io_1 = __webpack_require__(66);
const redis_adapter_1 = __webpack_require__(67);
const redis_1 = __webpack_require__(68);
class RedisIoAdapter extends platform_socket_io_1.IoAdapter {
    async connectToRedis() {
        const pubClient = (0, redis_1.createClient)({
            url: "ec2-13-125-27-69.ap-northeast-2.compute.amazonaws.com:6379",
        });
        const subClient = pubClient.duplicate();
        await Promise.all([pubClient.connect(), subClient.connect()]);
        this.adapterConstructor = (0, redis_adapter_1.createAdapter)(pubClient, subClient);
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        server.adapter(this.adapterConstructor);
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
/******/ 	__webpack_require__.h = () => ("4cff5de989103f159f5a")
/******/ })();
/******/ 
/******/ }
;