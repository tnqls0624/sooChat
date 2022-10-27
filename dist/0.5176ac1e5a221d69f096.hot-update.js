"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 3:
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(24);
const winston_util_1 = __webpack_require__(63);
const sucess_interceptor_1 = __webpack_require__(67);
const common_1 = __webpack_require__(6);
const httpExceptions_filter_1 = __webpack_require__(69);
const redis_adapter_1 = __webpack_require__(70);
const config_1 = __webpack_require__(9);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: winston_util_1.winstonLogger,
    });
    const configService = app.get(config_1.ConfigService);
    const port = `${process.env.NODE_PORT}` || 3000;
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


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1f5bd81faad01d31e915")
/******/ })();
/******/ 
/******/ }
;