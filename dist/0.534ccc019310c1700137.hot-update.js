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
class RedisIoAdapter extends platform_socket_io_1.IoAdapter {
    async connectToRedis() {
        const pubClient = (0, redis_1.createClient)({ url: `redis://localhost:6379` });
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


/***/ }),

/***/ 3:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(24);
const winston_util_1 = __webpack_require__(59);
const sucess_interceptor_1 = __webpack_require__(63);
const common_1 = __webpack_require__(6);
const httpExceptions_filter_1 = __webpack_require__(65);
const redis_adapter_1 = __webpack_require__(70);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: winston_util_1.winstonLogger,
    });
    const port = process.env.PORT || 3000;
    const redisIoAdapter = new redis_adapter_1.RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();
    app.useWebSocketAdapter(redisIoAdapter);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new httpExceptions_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new sucess_interceptor_1.SuccessInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle("API 문서")
        .setDescription("개발을 위한 API 문서")
        .setVersion("1.0")
        .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "authorization",
        description: "Enter JWT token",
        in: "header",
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    await app.listen(port);
    console.log(`Listening on port: ${port}`);
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();


/***/ }),

/***/ 71:
/***/ ((module) => {

module.exports = require("@nestjs/platform-socket.io");

/***/ }),

/***/ 72:
/***/ ((module) => {

module.exports = require("@socket.io/redis-adapter");

/***/ }),

/***/ 73:
/***/ ((module) => {

module.exports = require("redis");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9a1bc4456d99716bd474")
/******/ })();
/******/ 
/******/ }
;