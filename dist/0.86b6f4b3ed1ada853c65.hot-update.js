"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 5:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(6);
const app_controller_1 = __webpack_require__(7);
const app_service_1 = __webpack_require__(8);
const config_1 = __webpack_require__(9);
const joi_1 = __importDefault(__webpack_require__(10));
const path_1 = __importDefault(__webpack_require__(11));
const app_root_path_1 = __importDefault(__webpack_require__(12));
const logger_middleware_1 = __webpack_require__(13);
const typeorm_1 = __webpack_require__(15);
const auth_module_1 = __webpack_require__(16);
const user_module_1 = __webpack_require__(51);
const user_entity_1 = __webpack_require__(22);
const auth_entity_1 = __webpack_require__(26);
const mailer_1 = __webpack_require__(34);
const handlebars_adapter_1 = __webpack_require__(54);
const varifications_module_1 = __webpack_require__(55);
const varifications_entity_1 = __webpack_require__(32);
const events_module_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './events/events.module'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
let AppModule = class AppModule {
    constructor() {
        this.isDev = process.env.MODE === "dev";
    }
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes("*");
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: path_1.default.normalize(`${app_root_path_1.default.path}/src/config/env/.${process.env.NODE_ENV}.env`),
                validationSchema: joi_1.default.object({
                    NODE_ENV: joi_1.default.string().valid("dev", "prod").required(),
                    JWT_SECRET: joi_1.default.string().required(),
                    DB_HOST: joi_1.default.string().required(),
                    DB_PORT: joi_1.default.string().required(),
                    DB_USERNAME: joi_1.default.string().required(),
                    DB_PASSWORD: joi_1.default.string().required(),
                    DB_NAME: joi_1.default.string().required(),
                    JWT_ACCESS_TOKEN_SECRET: joi_1.default.string().required(),
                    JWT_ACCESS_TOKEN_EXPIRATION_TIME: joi_1.default.string().required(),
                    JWT_REFRESH_TOKEN_SECRET: joi_1.default.string().required(),
                    JWT_REFRESH_TOKEN_EXPIRATION_TIME: joi_1.default.string().required(),
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (config) => ({
                    type: "mysql",
                    host: config.get("DB_HOST"),
                    port: config.get("DB_PORT"),
                    username: config.get("DB_USERNAME"),
                    password: config.get("DB_PASSWORD"),
                    database: config.get("DB_NAME"),
                    entities: [user_entity_1.Users, auth_entity_1.Auth, varifications_entity_1.Varification],
                    synchronize: false,
                    autoLoadEntities: true,
                    charset: "utf8mb4",
                    logging: false,
                    keepConnectionAlive: true,
                    timezone: "Z",
                }),
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (config) => ({
                    transport: {
                        host: "smtp.naver.com",
                        port: 587,
                        tls: {
                            ciphers: "SSLv3",
                        },
                        secure: false,
                        auth: {
                            user: config.get("EMAIL_ID"),
                            pass: config.get("EMAIL_PASSWORD"),
                        },
                    },
                    defaults: {
                        from: `nest-modules <${config.get("EMAIL_ID")}@naver.com>`,
                    },
                    template: {
                        dir: process.cwd() + "/src/template/",
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
            }),
            varifications_module_1.VarificationsModule,
            events_module_1.EventsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, logger_middleware_1.LoggerMiddleware, common_1.Logger],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ 8:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(6);
const events_gateway_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './events/gateway/events.gateway'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
let AppService = class AppService {
    constructor(eventsGateway) {
        this.eventsGateway = eventsGateway;
    }
    getHello() {
        this.eventsGateway.server.to(`/ws-1-1`).emit("message", "나는 수빈~~ ");
        return "Hello World!";
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof events_gateway_1.EventsGateway !== "undefined" && events_gateway_1.EventsGateway) === "function" ? _a : Object])
], AppService);
exports.AppService = AppService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("597862714377e9f63fad")
/******/ })();
/******/ 
/******/ }
;