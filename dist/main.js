/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __resourceQuery = "?100";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.slice(1) || 0;
	var log = __webpack_require__(1);

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function (updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(2)(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function (err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + log.formatError(err));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log("warning", "[HMR] Update failed: " + log.formatError(err));
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}


/***/ }),
/* 1 */
/***/ ((module) => {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function (level) {
	logLevel = level;
};

module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(1);

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),
/* 3 */
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(4);
const app_module_1 = __webpack_require__(5);
const swagger_1 = __webpack_require__(24);
const winston_util_1 = __webpack_require__(83);
const sucess_interceptor_1 = __webpack_require__(87);
const common_1 = __webpack_require__(6);
const httpExceptions_filter_1 = __webpack_require__(89);
const redis_adapter_1 = __webpack_require__(90);
const config_1 = __webpack_require__(9);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: winston_util_1.winstonLogger,
    });
    const configService = app.get(config_1.ConfigService);
    const port = `${process.env.NODE_PORT}` || 3000;
    const redisIoAdapter = new redis_adapter_1.RedisIoAdapter(app, configService);
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
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/core");

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
const mailer_1 = __webpack_require__(57);
const handlebars_adapter_1 = __webpack_require__(61);
const varifications_module_1 = __webpack_require__(52);
const varifications_entity_1 = __webpack_require__(35);
const chat_module_1 = __webpack_require__(62);
const gateway_module_1 = __webpack_require__(68);
const room_module_1 = __webpack_require__(69);
const room_entity_1 = __webpack_require__(29);
const participant_eneity_1 = __webpack_require__(28);
const friend_module_1 = __webpack_require__(79);
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
                    DB_HOST: joi_1.default.string().required(),
                    DB_PORT: joi_1.default.string().required(),
                    DB_USERNAME: joi_1.default.string().required(),
                    DB_PASSWORD: joi_1.default.string().required(),
                    DB_NAME: joi_1.default.string().required(),
                    JWT_ACCESS_TOKEN_SECRET: joi_1.default.string().required(),
                    JWT_ACCESS_TOKEN_EXPIRATION_TIME: joi_1.default.string().required(),
                    JWT_REFRESH_TOKEN_SECRET: joi_1.default.string().required(),
                    JWT_REFRESH_TOKEN_EXPIRATION_TIME: joi_1.default.string().required(),
                    REDIS_URL: joi_1.default.string().required(),
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
                    entities: [user_entity_1.Users, auth_entity_1.Auth, varifications_entity_1.Varification, room_entity_1.Room, participant_eneity_1.Participant],
                    synchronize: true,
                    autoLoadEntities: true,
                    charset: "utf8mb4",
                    logging: true,
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
            chat_module_1.ChatModule,
            gateway_module_1.GatewayModule,
            room_module_1.RoomModule,
            friend_module_1.FriendModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, logger_middleware_1.LoggerMiddleware, common_1.Logger],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common");

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.AppController = void 0;
const common_1 = __webpack_require__(6);
const app_service_1 = __webpack_require__(8);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(6);
let AppService = class AppService {
    getHello() {
        return "Hello World!";
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),
/* 9 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/config");

/***/ }),
/* 10 */
/***/ ((module) => {

"use strict";
module.exports = require("joi");

/***/ }),
/* 11 */
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),
/* 12 */
/***/ ((module) => {

"use strict";
module.exports = require("app-root-path");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerMiddleware = void 0;
const common_1 = __webpack_require__(6);
const moment_1 = __importDefault(__webpack_require__(14));
let LoggerMiddleware = class LoggerMiddleware {
    constructor(logger) {
        this.logger = logger;
    }
    use(req, res, next) {
        const { ip, method, originalUrl, body, headers } = req;
        const time = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        res.on('finish', () => {
            const { statusCode } = res;
            this.logger.log(`${time} method : ${method}, originalUrl : ${originalUrl}, statusCode : ${statusCode}, ip: ${ip}, content-type : ${headers['content-type']}, body : ${JSON.stringify(body)}`);
        });
        next();
    }
};
LoggerMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.Logger)),
    __metadata("design:paramtypes", [typeof (_a = typeof common_1.LoggerService !== "undefined" && common_1.LoggerService) === "function" ? _a : Object])
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;


/***/ }),
/* 14 */
/***/ ((module) => {

"use strict";
module.exports = require("moment");

/***/ }),
/* 15 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/typeorm");

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(6);
const passport_1 = __webpack_require__(17);
const typeorm_1 = __webpack_require__(15);
const auth_service_1 = __webpack_require__(18);
const jwt_1 = __webpack_require__(20);
const config_1 = __webpack_require__(9);
const jwt_strategy_1 = __webpack_require__(36);
const auth_controller_1 = __webpack_require__(38);
const user_entity_1 = __webpack_require__(22);
const auth_entity_1 = __webpack_require__(26);
const auth_repository_1 = __webpack_require__(33);
const varifications_entity_1 = __webpack_require__(35);
const user_module_1 = __webpack_require__(51);
const varifications_module_1 = __webpack_require__(52);
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: "jwt", session: false }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (config) => ({
                    secret: config.get("JWT_ACCESS_TOKEN_SECRET"),
                    signOptions: {
                        expiresIn: config.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME"),
                    },
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.Users, auth_entity_1.Auth, varifications_entity_1.Varification]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => varifications_module_1.VarificationsModule),
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, auth_repository_1.AuthRepository, common_1.Logger],
        exports: [auth_service_1.AuthService, auth_repository_1.AuthRepository],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),
/* 17 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/passport");

/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(6);
const bcrypt_1 = __importStar(__webpack_require__(19));
const jwt_1 = __webpack_require__(20);
const config_1 = __webpack_require__(9);
const user_repository_1 = __webpack_require__(21);
const user_entity_1 = __webpack_require__(22);
const moment_1 = __importDefault(__webpack_require__(14));
const axios_1 = __importDefault(__webpack_require__(31));
const google_auth_library_1 = __webpack_require__(32);
const auth_repository_1 = __webpack_require__(33);
let AuthService = class AuthService {
    constructor(jwtService, config, usersRepository, authRepository) {
        this.jwtService = jwtService;
        this.config = config;
        this.usersRepository = usersRepository;
        this.authRepository = authRepository;
    }
    async validateUser(signname, password) {
        const user = await this.usersRepository.findUser(signname);
        if (!user) {
            throw new common_1.HttpException("Not User", 400);
        }
        const bcryptPassWord = await bcrypt_1.default.compare(password, user.password);
        if (bcryptPassWord) {
            const { password, withdraw_at } = user, userWithoutPassword = __rest(user, ["password", "withdraw_at"]);
            return userWithoutPassword;
        }
        return null;
    }
    async jwtLogIn(data) {
        const { signname, password } = data;
        const user = await this.validateUser(signname, password);
        if (!user) {
            throw new common_1.HttpException("유저가 존재하지 않습니다.", 400);
        }
        const accessToken = this.jwtService.sign(data, {
            secret: this.config.get("JWT_ACCESS_TOKEN_SECRET"),
            expiresIn: this.config.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME"),
        });
        const refreshToken = this.jwtService.sign(data, {
            secret: this.config.get("JWT_REFRESH_TOKEN_SECRET"),
            expiresIn: this.config.get("JWT_REFRESH_TOKEN_EXPIRATION_TIME"),
        });
        const result = {
            accessToken,
            refreshToken,
        };
        return result;
    }
    async socialLogIn(data) {
        const accessToken = this.jwtService.sign(data, {
            secret: this.config.get("JWT_ACCESS_TOKEN_SECRET"),
        });
        const refreshToken = this.jwtService.sign(data, {
            secret: this.config.get("JWT_REFRESH_TOKEN_SECRET"),
        });
        const result = {
            accessToken,
            refreshToken,
        };
        return result;
    }
    async reissueToken(data) {
        const { refreshToken } = data;
        const decodedRefreshToken = this.jwtService.decode(refreshToken, this.config.get("JWT_REFRESH_TOKEN_SECRET"));
        const _a = await this.usersRepository.findUser(decodedRefreshToken.signname), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
        if (!userWithoutPassword) {
            throw new common_1.HttpException("Not User", 400);
        }
        const accessToken = this.jwtService.sign(data, {
            secret: this.config.get("JWT_ACCESS_TOKEN_SECRET"),
        });
        return accessToken;
    }
    async createUser(body) {
        const { signname, password, method } = body;
        const created_at = (0, moment_1.default)().toISOString();
        try {
            if (method === user_entity_1.UserTypeEnum.KAKAO) {
                const { data: response } = await axios_1.default.get("https://kapi.kakao.com/v2/user/me", {
                    headers: {
                        Authorization: `Bearer ${password}`,
                    },
                });
                body.signname = String(response.id) + `@${user_entity_1.UserTypeEnum.KAKAO}`;
                body.password = await (0, bcrypt_1.hash)(signname + created_at, 10);
            }
            else if (method === user_entity_1.UserTypeEnum.GOOGLE) {
            }
            else if (method === user_entity_1.UserTypeEnum.NAVER) {
                const { data: { response }, } = await axios_1.default.get("https://openapi.naver.com/v1/nid/me", {
                    headers: {
                        Authorization: `Bearer ${body.password}`,
                    },
                });
                body.signname = String(response.id) + `@${user_entity_1.UserTypeEnum.NAVER}`;
                body.password = await (0, bcrypt_1.hash)(signname + created_at, 10);
            }
            else {
                body.password = await bcrypt_1.default.hash(body.password, 12);
            }
            const args = Object.assign(Object.assign({}, body), { withdraw: "false", varifymail: "false" });
            const result = this.authRepository.createUser(args);
            return result;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error, 400);
        }
    }
    async loginUser(body) {
        const created_at = (0, moment_1.default)().toISOString();
        let refreshToken;
        let accessToken;
        try {
            if (body.method === user_entity_1.UserTypeEnum.KAKAO) {
                const { data: response } = await axios_1.default.get("https://kapi.kakao.com/v2/user/me", {
                    headers: {
                        Authorization: `Bearer ${body.password}`,
                    },
                });
                body.signname = String(response.id) + `@${user_entity_1.UserTypeEnum.KAKAO}`;
                const user = await this.usersRepository.findUser(body.signname);
                if (!user) {
                    const joinData = {
                        method: user_entity_1.UserTypeEnum.KAKAO,
                        signname: body.signname,
                        password: body.password,
                    };
                    await this.createUser(joinData);
                }
                body.password = await (0, bcrypt_1.hash)(String(response.id) + created_at, 10);
                ({ refreshToken, accessToken } = await this.socialLogIn(body));
            }
            else if (body.method === user_entity_1.UserTypeEnum.GOOGLE) {
                const client = new google_auth_library_1.OAuth2Client(this.config.get("GOOGLE_CLIENT_KEY"));
                const ticket = await client.verifyIdToken({
                    idToken: body.password,
                    audience: this.config.get("GOOGLE_CLIENT_KEY"),
                });
                const payload = ticket.getPayload();
                if (!payload)
                    throw new common_1.HttpException("invalid token", 400);
                const userid = payload.sub || "";
                body.signname = String(userid) + `@${user_entity_1.UserTypeEnum.GOOGLE}`;
                const user = await this.usersRepository.findUser(body.signname);
                if (!user) {
                    const joinData = {
                        method: user_entity_1.UserTypeEnum.KAKAO,
                        signname: body.signname,
                        password: body.password,
                    };
                    await this.createUser(joinData);
                }
                body.password = await (0, bcrypt_1.hash)(String(userid) + created_at, 10);
                ({ refreshToken, accessToken } = await this.socialLogIn(body));
            }
            else if (body.method === user_entity_1.UserTypeEnum.NAVER) {
                const { data: { response }, } = await axios_1.default.get("https://openapi.naver.com/v1/nid/me", {
                    headers: {
                        Authorization: `Bearer ${body.password}`,
                    },
                });
                body.signname = String(response.id) + `@${user_entity_1.UserTypeEnum.NAVER}`;
                const user = await this.usersRepository.findUser(body.signname);
                if (!user) {
                    const joinData = {
                        method: user_entity_1.UserTypeEnum.NAVER,
                        signname: body.signname,
                        password: body.password,
                        email: response.email,
                        phone: response.mobile.replace(/\-/g, ""),
                        name: response.name,
                    };
                    await this.createUser(joinData);
                }
                body.password = await (0, bcrypt_1.hash)(String(response.id) + created_at, 10);
                ({ refreshToken, accessToken } = await this.socialLogIn(body));
            }
            else {
                ({ refreshToken, accessToken } = await this.jwtLogIn(body));
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error, 400);
        }
        await this.authRepository.loginUser(refreshToken, body.signname);
        const result = {
            accessToken,
            refreshToken,
        };
        return result;
    }
    async updateUser(signname, body) {
        const reuslt = this.authRepository.updateUser(signname, body);
        return reuslt;
    }
    async changePassword(user, body) {
        const reuslt = this.authRepository.changePassword(user, body);
        return reuslt;
    }
    async findPasswordChange(key, body) {
        const reuslt = this.authRepository.findPasswordChange(key, body);
        return reuslt;
    }
    async deleteUser(user) {
        const reuslt = this.authRepository.deleteUser(user);
        return reuslt;
    }
    async kakaoCallback(req) {
        const { data: { access_token }, } = await axios_1.default.post("https://kauth.kakao.com/oauth/token", {
            grant_type: "authorization_code",
            client_id: this.config.get("KAKAO_REST_API"),
            redirect_uri: this.config.get("KAKAO_CALL_BACK"),
            code: req.query.code,
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const data = {
            method: user_entity_1.UserTypeEnum.KAKAO,
            signname: "KAKAO",
            password: access_token,
        };
        return await this.loginUser(data);
    }
    async naverCallback(req) {
        const { data: { access_token }, } = await axios_1.default.post("https://nid.naver.com/oauth2.0/token", {
            grant_type: "authorization_code",
            client_id: this.config.get("NAVER_REST_API"),
            client_secret: this.config.get("NAVER_SECRET"),
            code: req.query.code,
            state: "STATE_STRING",
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const data = {
            method: user_entity_1.UserTypeEnum.NAVER,
            signname: "NAVER",
            password: access_token,
        };
        return await this.loginUser(data);
    }
    async googleCallback(req) {
        const data = {
            method: user_entity_1.UserTypeEnum.GOOGLE,
            signname: "GOOGLE",
            password: req.idToken,
        };
        return await this.loginUser(data);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _c : Object, typeof (_d = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _d : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),
/* 19 */
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),
/* 20 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/jwt");

/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(15);
const user_entity_1 = __webpack_require__(22);
const typeorm_2 = __webpack_require__(23);
let UserRepository = class UserRepository {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findUser(signname) {
        const user = await this.userRepository.findOne({
            where: { signname, withdraw: "false" },
        });
        if (!user) {
            throw new common_1.HttpException("not user", 400);
        }
        return user;
    }
    async findUserId(user_id) {
        const user = await this.userRepository.findOne({
            where: { id: user_id, withdraw: "false" },
        });
        if (!user) {
            throw new common_1.HttpException("not user", 400);
        }
        return user;
    }
    async checkDuplicatedEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email, withdraw: "false" },
        });
        if (user) {
            throw new common_1.HttpException("duplicate email", 400);
        }
        return true;
    }
    async checkDuplicatedPhone(email) {
        const user = await this.userRepository.findOne({
            where: { email, withdraw: "false" },
        });
        if (user) {
            throw new common_1.HttpException("duplicate email", 400);
        }
        return true;
    }
    async duplicateUser(signname) {
        const user = await this.userRepository.findOne({
            where: { signname, withdraw: "false" },
        });
        if (user) {
            throw new common_1.HttpException("duplicate user", 400);
        }
        return user;
    }
    async findUserforEmail(to) {
        const user = await this.userRepository.findOne({
            where: { email: to, withdraw: "false" },
        });
        if (!user) {
            throw new common_1.HttpException("not user", 400);
        }
        return user;
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UserRepository);
exports.UserRepository = UserRepository;


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Users = exports.UserTypeEnum = void 0;
const typeorm_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
const auth_entity_1 = __webpack_require__(26);
const class_transformer_1 = __webpack_require__(27);
const participant_eneity_1 = __webpack_require__(28);
const friend_eneity_1 = __webpack_require__(30);
var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum["KAKAO"] = "KAKAO";
    UserTypeEnum["GOOGLE"] = "GOOGLE";
    UserTypeEnum["NAVER"] = "NAVER";
    UserTypeEnum["SIGNNAME"] = "SIGNNAME";
})(UserTypeEnum = exports.UserTypeEnum || (exports.UserTypeEnum = {}));
let Users = class Users {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "SIGNNAME",
        description: "메소드",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsEnum)(UserTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        type: "varchar",
        comment: "로그인 방식(SIGNNAME/KAKAO/GOOGLE/APPLE)",
    }),
    __metadata("design:type", String)
], Users.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "dktnqls0624",
        description: "아이디",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[A-Za-z0-9]+$/, {
        message: "숫자, 영(소, 대)문자만 입력할 수 있습니다!",
    }),
    (0, typeorm_1.Column)({ type: "varchar", length: 20, comment: "유저 아이디", unique: true }),
    __metadata("design:type", String)
], Users.prototype, "signname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "test1234!",
        description: "비밀번호",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(15),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[A-Za-z\d$!@#$%^&*?&]{8,15}$/, {
        message: "영(소, 대)문자, 특수문자($!@#$%^&*?&)만 입력이 가능하고, 8~15글자 이내에 입력 해 주세요!",
    }),
    (0, typeorm_1.Column)({ type: "varchar", comment: "유저 비밀번호" }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "이수빈",
        description: "이름",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(15),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[0-9A-Za-zㄱ-ㅎㅏ-ㅣ-가-힣]+$/, {
        message: "숫자,영(소, 대)문자, 한글만 입력 가능 합니다!",
    }),
    (0, typeorm_1.Column)({ type: "varchar", length: 15, comment: "유저 이름" }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "dktnqls0624@itechcompany.kr",
        description: "이메일",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[0-9A-Za-z]+@[0-9A-Za-z]+\.([a-z]+)*$/, {
        message: "이메일 형식에 맞게 입력 해 주세요!",
    }),
    (0, typeorm_1.Column)("varchar", {
        name: "email",
        unique: true,
        comment: "유저 이메일",
    }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "01011112222",
        description: "핸드폰번호",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^01(?:0|1|[6-9])?(\d{3}|\d{4})?(\d{4})$/, {
        message: "핸드폰 번호의 형식에 맞게 입력해주세요!",
    }),
    (0, typeorm_1.Column)("varchar", {
        name: "phone",
        unique: true,
        comment: "유저 전화번호",
    }),
    __metadata("design:type", String)
], Users.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)("varchar", {
        name: "varifymail",
        comment: "이메일 인증 여부",
    }),
    __metadata("design:type", String)
], Users.prototype, "varifymail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)("varchar", {
        name: "withdraw",
        comment: "탈퇴 여부",
    }),
    __metadata("design:type", String)
], Users.prototype, "withdraw", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "create_at", comment: "생성일" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Users.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "update_at", comment: "수정일" }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Users.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: "withdraw_at", comment: "탈퇴일" }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Users.prototype, "withdraw_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => participant_eneity_1.Participant, (participant) => participant.User),
    __metadata("design:type", typeof (_d = typeof participant_eneity_1.Participant !== "undefined" && participant_eneity_1.Participant) === "function" ? _d : Object)
], Users.prototype, "Participant", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => auth_entity_1.Auth, (auth) => auth.User),
    __metadata("design:type", typeof (_e = typeof auth_entity_1.Auth !== "undefined" && auth_entity_1.Auth) === "function" ? _e : Object)
], Users.prototype, "Auth", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => friend_eneity_1.Friend, (friend) => friend.User),
    __metadata("design:type", typeof (_f = typeof friend_eneity_1.Friend !== "undefined" && friend_eneity_1.Friend) === "function" ? _f : Object)
], Users.prototype, "Friend", void 0);
Users = __decorate([
    (0, typeorm_1.Index)("id", ["id"], { unique: true }),
    (0, typeorm_1.Entity)({ name: "user" })
], Users);
exports.Users = Users;


/***/ }),
/* 23 */
/***/ ((module) => {

"use strict";
module.exports = require("typeorm");

/***/ }),
/* 24 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/swagger");

/***/ }),
/* 25 */
/***/ ((module) => {

"use strict";
module.exports = require("class-validator");

/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Auth = void 0;
const typeorm_1 = __webpack_require__(23);
const class_validator_1 = __webpack_require__(25);
const user_entity_1 = __webpack_require__(22);
const swagger_1 = __webpack_require__(24);
let Auth = class Auth {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Auth.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "djsabcjxzcoj34258493yfbdjsk",
        description: "재발급 토큰",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Auth.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        name: "user_id",
        comment: "리프레시 토큰ID",
        primary: true,
    }),
    __metadata("design:type", String)
], Auth.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "create_at", comment: "생성일" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Auth.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "update_at", comment: "수정일" }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Auth.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.Users, (user) => user.id, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "user_id", referencedColumnName: "id" }]),
    __metadata("design:type", typeof (_c = typeof user_entity_1.Users !== "undefined" && user_entity_1.Users) === "function" ? _c : Object)
], Auth.prototype, "User", void 0);
Auth = __decorate([
    (0, typeorm_1.Index)("id", ["id"], { unique: true }),
    (0, typeorm_1.Entity)({ name: "auth" })
], Auth);
exports.Auth = Auth;


/***/ }),
/* 27 */
/***/ ((module) => {

"use strict";
module.exports = require("class-transformer");

/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.Participant = void 0;
const typeorm_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
const class_transformer_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(22);
const room_entity_1 = __webpack_require__(29);
let Participant = class Participant {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Participant.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        type: "int",
        name: "user_id",
        comment: "유저 아이디",
    }),
    __metadata("design:type", Number)
], Participant.prototype, "user_id", void 0);
__decorate([
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        type: "int",
        name: "room_id",
        comment: "방 아이디",
    }),
    __metadata("design:type", Number)
], Participant.prototype, "room_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 4,
        description: "읽지 않은 채팅 수",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)({
        type: "int",
        name: "not_read_chatCount",
        nullable: true,
    }),
    __metadata("design:type", Number)
], Participant.prototype, "notReadChatCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "dktnqls0624",
        description: "마지막으로 읽은 채팅 아이디",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({
        type: "varchar",
        name: "last_read_chatId",
        comment: "마지막으로 읽은 채팅 아이디",
        nullable: true,
    }),
    __metadata("design:type", String)
], Participant.prototype, "lastReadChatId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.Users, (user) => user.Participant, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "user_id", referencedColumnName: "id" }]),
    __metadata("design:type", Array)
], Participant.prototype, "User", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_entity_1.Room, (room) => room.Participant, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "room_id", referencedColumnName: "id" }]),
    __metadata("design:type", typeof (_a = typeof room_entity_1.Room !== "undefined" && room_entity_1.Room) === "function" ? _a : Object)
], Participant.prototype, "Room", void 0);
Participant = __decorate([
    (0, typeorm_1.Index)("id", ["id"], { unique: true }),
    (0, typeorm_1.Entity)({ name: "participant" })
], Participant);
exports.Participant = Participant;


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Room = exports.RoomTypeEnum = void 0;
const typeorm_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
const class_transformer_1 = __webpack_require__(27);
const participant_eneity_1 = __webpack_require__(28);
var RoomTypeEnum;
(function (RoomTypeEnum) {
    RoomTypeEnum["INDIVIDUAL"] = "INDIVIDUAL";
    RoomTypeEnum["GROUP"] = "GROUP";
})(RoomTypeEnum = exports.RoomTypeEnum || (exports.RoomTypeEnum = {}));
let Room = class Room {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "방번호",
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Room.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "이수빈방",
        description: "방이름",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: "varchar", comment: "방이름" }),
    __metadata("design:type", String)
], Room.prototype, "roomName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "방장아이디",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        type: "int",
        comment: "방장아이디",
    }),
    __metadata("design:type", Number)
], Room.prototype, "room_master_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "INDIVIDUAL",
        description: "방타입",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsEnum)(RoomTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        type: "varchar",
        comment: "방타입(INDIVIDUAL/GROUP)",
    }),
    __metadata("design:type", String)
], Room.prototype, "type", void 0);
__decorate([
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        type: "int",
        comment: "참가인원수",
    }),
    __metadata("design:type", Number)
], Room.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "동해물과 백두산이",
        description: "마지막 내용",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: "varchar", comment: "마지막 내용", nullable: true }),
    __metadata("design:type", String)
], Room.prototype, "lastChat", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "create_at", comment: "생성일" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Room.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "update_at", comment: "수정일" }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Room.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => participant_eneity_1.Participant, (participant) => participant.Room, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Room.prototype, "Participant", void 0);
Room = __decorate([
    (0, typeorm_1.Index)("id", ["id"], { unique: true }),
    (0, typeorm_1.Entity)({ name: "room" })
], Room);
exports.Room = Room;


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Friend = void 0;
const typeorm_1 = __webpack_require__(23);
const class_validator_1 = __webpack_require__(25);
const class_transformer_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(22);
let Friend = class Friend {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Friend.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        type: "int",
        name: "user_id",
        comment: "유저 아이디",
    }),
    __metadata("design:type", Number)
], Friend.prototype, "user_id", void 0);
__decorate([
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        type: "int",
        name: "friend_id",
        comment: "친구 아이디",
    }),
    __metadata("design:type", Number)
], Friend.prototype, "friend_id", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "update_at", comment: "수정일" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Friend.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "create_at", comment: "생성일" }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Friend.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.Users, (user) => user.Friend, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "user_id", referencedColumnName: "id" }]),
    __metadata("design:type", Array)
], Friend.prototype, "User", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.Users, (user) => user.Friend, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "friend_id", referencedColumnName: "id" }]),
    __metadata("design:type", Array)
], Friend.prototype, "Friend", void 0);
Friend = __decorate([
    (0, typeorm_1.Index)("id", ["id"], { unique: true }),
    (0, typeorm_1.Entity)({ name: "friend" })
], Friend);
exports.Friend = Friend;


/***/ }),
/* 31 */
/***/ ((module) => {

"use strict";
module.exports = require("axios");

/***/ }),
/* 32 */
/***/ ((module) => {

"use strict";
module.exports = require("google-auth-library");

/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRepository = void 0;
const common_1 = __webpack_require__(6);
const moment_1 = __importDefault(__webpack_require__(14));
const user_entity_1 = __webpack_require__(22);
const user_repository_1 = __webpack_require__(21);
const typeorm_1 = __webpack_require__(23);
const auth_entity_1 = __webpack_require__(26);
const varifications_repository_1 = __webpack_require__(34);
const bcrypt_1 = __webpack_require__(19);
let AuthRepository = class AuthRepository {
    constructor(connection, userRepository, varifyRepository) {
        this.connection = connection;
        this.userRepository = userRepository;
        this.varifyRepository = varifyRepository;
    }
    async createUser(args) {
        const { signname } = args;
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        await this.userRepository.duplicateUser(signname);
        try {
            const user = await queryRunner.manager.save(user_entity_1.Users, args);
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            await queryRunner.commitTransaction();
            return userWithoutPassword;
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
    }
    async loginUser(refreshToken, signname) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await this.userRepository.findUser(signname);
            await queryRunner.manager.upsert(auth_entity_1.Auth, [{ user_id: String(user.id), refreshToken }], ["id"]);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
        return true;
    }
    async updateUser(signname, body) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.userRepository.findUser(signname);
            await queryRunner.manager.update(user_entity_1.Users, { signname }, body);
            await queryRunner.commitTransaction();
            return true;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
    }
    async changePassword(user, body) {
        try {
            console.log(user);
            const newPassword = await (0, bcrypt_1.hash)(body.password, 12);
            user.password = newPassword;
            this.updateUser(user.signname, user);
            return true;
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    async findPasswordChange(key, body) {
        try {
            const varification = await this.varifyRepository.varifyMailKey(key, body.signname);
            const user = await this.userRepository.findUser(varification.signname);
            const newPassword = await (0, bcrypt_1.hash)(body.password, 12);
            user.password = newPassword;
            this.updateUser(user.signname, user);
            this.varifyRepository.removeVarify(varification);
            return true;
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    async deleteUser(user) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.userRepository.findUser(user.signname);
            await queryRunner.manager.update(user_entity_1.Users, { signname: user.signname }, {
                withdraw: "true",
                withdraw_at: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
            });
            await queryRunner.commitTransaction();
            return true;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
    }
};
AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Connection !== "undefined" && typeorm_1.Connection) === "function" ? _a : Object, typeof (_b = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _b : Object, typeof (_c = typeof varifications_repository_1.VarificationsRepository !== "undefined" && varifications_repository_1.VarificationsRepository) === "function" ? _c : Object])
], AuthRepository);
exports.AuthRepository = AuthRepository;


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VarificationsRepository = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(15);
const user_entity_1 = __webpack_require__(22);
const user_repository_1 = __webpack_require__(21);
const typeorm_2 = __webpack_require__(23);
const varifications_entity_1 = __webpack_require__(35);
let VarificationsRepository = class VarificationsRepository {
    constructor(userRepository, connection, varifyRepository) {
        this.userRepository = userRepository;
        this.connection = connection;
        this.varifyRepository = varifyRepository;
    }
    async requestMail(args) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.userRepository.findUser(args.signname);
            const varification = await queryRunner.manager.findOne(varifications_entity_1.Varification, {
                where: { type: args.type, to: args.to, signname: args.signname },
            });
            if (varification) {
                await queryRunner.manager.update(varifications_entity_1.Varification, { id: varification.id }, args);
            }
            else {
                await queryRunner.manager.save(varifications_entity_1.Varification, args);
            }
            await queryRunner.commitTransaction();
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
        return args.token;
    }
    async varifyMail(body) {
        const { token, key } = body;
        const varification = await this.varifyMailTokenAndKey(token, key);
        await Promise.all([
            this.updateVarify(varification),
            this.removeVarify(varification),
        ]);
        return true;
    }
    async removeVarify(varification) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.remove(varifications_entity_1.Varification, varification);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateVarify(verification) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.update(user_entity_1.Users, {
                signname: verification.signname,
            }, {
                varifymail: "true",
            });
            await queryRunner.commitTransaction();
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
    }
    async varifyMailTokenAndKey(token, key) {
        const verification = await this.varifyRepository.findOne({
            where: { token, key },
        });
        if (!verification)
            throw new common_1.HttpException("invalid token", 400);
        return verification;
    }
    async varifyMailKey(key, signname) {
        const verification = await this.varifyRepository.findOne({
            where: { type: varifications_entity_1.VerificationTypeEnum.PASSWORD, key, signname },
        });
        if (!verification)
            throw new common_1.HttpException("not key", 400);
        return verification;
    }
};
VarificationsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(varifications_entity_1.Varification)),
    __metadata("design:paramtypes", [typeof (_a = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Connection !== "undefined" && typeorm_2.Connection) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], VarificationsRepository);
exports.VarificationsRepository = VarificationsRepository;


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Varification = exports.VerificationTypeEnum = void 0;
const typeorm_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
const class_transformer_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(22);
var VerificationTypeEnum;
(function (VerificationTypeEnum) {
    VerificationTypeEnum["MAIL"] = "MAIL";
    VerificationTypeEnum["SIGNNAME"] = "SIGNNAME";
    VerificationTypeEnum["PASSWORD"] = "PASSWORD";
})(VerificationTypeEnum = exports.VerificationTypeEnum || (exports.VerificationTypeEnum = {}));
let Varification = class Varification {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Varification.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "PASSWORD",
        description: "타입",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsEnum)(VerificationTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 10, comment: "타입" }),
    __metadata("design:type", String)
], Varification.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "dktnqls0624@itechcompany.kr",
        description: "받는 이메일 주소",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: "varchar", comment: "보낼 주소" }),
    __metadata("design:type", String)
], Varification.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "vbdfibi",
        description: "토큰",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 20, comment: "토큰" }),
    __metadata("design:type", String)
], Varification.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "123456",
        description: "키값",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 10, comment: "키값" }),
    __metadata("design:type", String)
], Varification.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "dktnqls0624",
        description: "아이디",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[A-Za-z0-9]+$/, {
        message: "숫자, 영(소, 대)문자만 입력할 수 있습니다!",
    }),
    (0, typeorm_1.Column)({ type: "varchar", length: 20, comment: "유저 아이디" }),
    __metadata("design:type", String)
], Varification.prototype, "signname", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "create_at", comment: "생성일" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Varification.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "update_at", comment: "수정일" }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Varification.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.Users, (user) => user.id, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "signname", referencedColumnName: "signname" }]),
    __metadata("design:type", typeof (_c = typeof user_entity_1.Users !== "undefined" && user_entity_1.Users) === "function" ? _c : Object)
], Varification.prototype, "User", void 0);
Varification = __decorate([
    (0, typeorm_1.Index)("id", ["id"], { unique: true }),
    (0, typeorm_1.Entity)({ name: "varification" })
], Varification);
exports.Varification = Varification;


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(37);
const passport_1 = __webpack_require__(17);
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(9);
const auth_service_1 = __webpack_require__(18);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(authService, config) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_ACCESS_TOKEN_SECRET'),
            ignoreExpiration: true,
        });
        this.authService = authService;
    }
    async validate(payload) {
        const { signname, method, password } = payload;
        const user = this.authService.validateUser(signname, password);
        if (user) {
            return user;
        }
        else {
            throw new common_1.HttpException('No Access', 401);
        }
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),
/* 37 */
/***/ ((module) => {

"use strict";
module.exports = require("passport-jwt");

/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(24);
const user_decorator_1 = __webpack_require__(39);
const response_dto_1 = __webpack_require__(40);
const undefinedToNull_interceptor_1 = __webpack_require__(41);
const joinUser_dto_1 = __webpack_require__(43);
const loginUser_dto_1 = __webpack_require__(44);
const reissueToken_dto_1 = __webpack_require__(45);
const updateUser_dto_1 = __webpack_require__(46);
const user_dto_1 = __webpack_require__(47);
const auth_service_1 = __webpack_require__(18);
const guard_1 = __webpack_require__(48);
const findPasswordChange_dto_copy_1 = __webpack_require__(49);
const passwordChange_dto_1 = __webpack_require__(50);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    createUser(body) {
        return this.authService.createUser(body);
    }
    loginUser(body) {
        return this.authService.loginUser(body);
    }
    changePassword(user, body) {
        return this.authService.changePassword(user, body);
    }
    findPasswordChange(key, body) {
        return this.authService.findPasswordChange(key, body);
    }
    getLoginUser(user) {
        return user;
    }
    reissueToken(body) {
        return this.authService.reissueToken(body);
    }
    updateUser(user, body) {
        return this.authService.updateUser(user.signname, body);
    }
    deleteUser(user) {
        return this.authService.deleteUser(user);
    }
    async kakaoCallback(req) {
        return this.authService.kakaoCallback(req);
    }
    async googleCallback(req) {
        console.log(req);
    }
    async naverCallback(req) {
        return this.authService.naverCallback(req);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "회원가입" }),
    (0, common_1.Post)("/register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof joinUser_dto_1.JoinUserDto !== "undefined" && joinUser_dto_1.JoinUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "로그인" }),
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof loginUser_dto_1.LoginUserDto !== "undefined" && loginUser_dto_1.LoginUserDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "비밀번호 변경" }),
    (0, common_1.Post)("/password"),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof user_dto_1.UserDto !== "undefined" && user_dto_1.UserDto) === "function" ? _d : Object, typeof (_e = typeof passwordChange_dto_1.PasswordChangeDto !== "undefined" && passwordChange_dto_1.PasswordChangeDto) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "비밀번호 변경" }),
    (0, swagger_1.ApiParam)({
        name: "key",
        required: true,
        description: "인증번호",
        type: "string",
    }),
    (0, common_1.Post)("/find-password/:key"),
    __param(0, (0, common_1.Param)("key")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof findPasswordChange_dto_copy_1.FindPasswordChangeDto !== "undefined" && findPasswordChange_dto_copy_1.FindPasswordChangeDto) === "function" ? _f : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findPasswordChange", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "로그인 정보 조회" }),
    (0, common_1.Get)("/login"),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof user_dto_1.UserDto !== "undefined" && user_dto_1.UserDto) === "function" ? _g : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getLoginUser", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "토큰 재발급" }),
    (0, common_1.Post)("/refreshToken"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof reissueToken_dto_1.ReissueTokenDto !== "undefined" && reissueToken_dto_1.ReissueTokenDto) === "function" ? _h : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "reissueToken", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "회원정보 수정" }),
    (0, common_1.Put)("/login"),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof user_dto_1.UserDto !== "undefined" && user_dto_1.UserDto) === "function" ? _j : Object, typeof (_k = typeof updateUser_dto_1.UpdateUserDto !== "undefined" && updateUser_dto_1.UpdateUserDto) === "function" ? _k : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "회원 탈퇴" }),
    (0, common_1.Delete)("/login"),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof user_dto_1.UserDto !== "undefined" && user_dto_1.UserDto) === "function" ? _l : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "deleteUser", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "카카오 로그인 콜백" }),
    (0, common_1.Get)("/kakao/callback"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "kakaoCallback", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "구글 로그인 콜백" }),
    (0, common_1.Get)("/google/callback"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleCallback", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "네이버 로그인 콜백" }),
    (0, common_1.Get)("/naver/callback"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "naverCallback", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)("AUTH"),
    (0, common_1.UseInterceptors)(undefinedToNull_interceptor_1.UndefinedToNullInterceptor),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const common_1 = __webpack_require__(6);
exports.User = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseDto = void 0;
const swagger_1 = __webpack_require__(24);
class ResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: true,
        description: 'success',
    }),
    __metadata("design:type", Boolean)
], ResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: [{}],
        description: 'data',
    }),
    __metadata("design:type", typeof (_a = typeof Array !== "undefined" && Array) === "function" ? _a : Object)
], ResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: '2022-04-21T09:50:24.675Z',
        description: 'timestamp',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ResponseDto.prototype, "timestamp", void 0);
exports.ResponseDto = ResponseDto;


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UndefinedToNullInterceptor = void 0;
const common_1 = __webpack_require__(6);
const rxjs_1 = __webpack_require__(42);
let UndefinedToNullInterceptor = class UndefinedToNullInterceptor {
    intercept(context, next) {
        return next
            .handle()
            .pipe((0, rxjs_1.map)((data) => (data === undefined ? null : data)));
    }
};
UndefinedToNullInterceptor = __decorate([
    (0, common_1.Injectable)()
], UndefinedToNullInterceptor);
exports.UndefinedToNullInterceptor = UndefinedToNullInterceptor;


/***/ }),
/* 42 */
/***/ ((module) => {

"use strict";
module.exports = require("rxjs");

/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JoinUserDto = void 0;
const swagger_1 = __webpack_require__(24);
const user_entity_1 = __webpack_require__(22);
class JoinUserDto extends (0, swagger_1.PickType)(user_entity_1.Users, [
    'method',
    'signname',
    'password',
    'name',
    'email',
    'phone',
]) {
}
exports.JoinUserDto = JoinUserDto;


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginUserDto = void 0;
const swagger_1 = __webpack_require__(24);
const user_entity_1 = __webpack_require__(22);
class LoginUserDto extends (0, swagger_1.PickType)(user_entity_1.Users, [
    'method',
    'signname',
    'password',
]) {
}
exports.LoginUserDto = LoginUserDto;


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReissueTokenDto = void 0;
const swagger_1 = __webpack_require__(24);
const auth_entity_1 = __webpack_require__(26);
class ReissueTokenDto extends (0, swagger_1.PickType)(auth_entity_1.Auth, [
    'refreshToken',
]) {
}
exports.ReissueTokenDto = ReissueTokenDto;


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
const swagger_1 = __webpack_require__(24);
const user_entity_1 = __webpack_require__(22);
class UpdateUserDto extends (0, swagger_1.PickType)(user_entity_1.Users, [
    'name',
    'email',
    'phone',
]) {
}
exports.UpdateUserDto = UpdateUserDto;


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserDto = void 0;
const swagger_1 = __webpack_require__(24);
const user_entity_1 = __webpack_require__(22);
class UserDto extends (0, swagger_1.PickType)(user_entity_1.Users, [
    'signname',
    'password',
    'name',
    'email',
    'phone',
    'created_at',
    'updated_at',
    'withdraw_at',
]) {
}
exports.UserDto = UserDto;


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(6);
const passport_1 = __webpack_require__(17);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindPasswordChangeDto = void 0;
const swagger_1 = __webpack_require__(24);
const user_entity_1 = __webpack_require__(22);
class FindPasswordChangeDto extends (0, swagger_1.PickType)(user_entity_1.Users, [
    'signname',
    'password',
]) {
}
exports.FindPasswordChangeDto = FindPasswordChangeDto;


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PasswordChangeDto = void 0;
const swagger_1 = __webpack_require__(24);
const user_entity_1 = __webpack_require__(22);
class PasswordChangeDto extends (0, swagger_1.PickType)(user_entity_1.Users, ['password']) {
}
exports.PasswordChangeDto = PasswordChangeDto;


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const common_1 = __webpack_require__(6);
const jwt_1 = __webpack_require__(20);
const typeorm_1 = __webpack_require__(15);
const auth_module_1 = __webpack_require__(16);
const auth_entity_1 = __webpack_require__(26);
const varifications_entity_1 = __webpack_require__(35);
const varifications_module_1 = __webpack_require__(52);
const user_controller_1 = __webpack_require__(59);
const user_entity_1 = __webpack_require__(22);
const user_repository_1 = __webpack_require__(21);
const user_service_1 = __webpack_require__(60);
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.Users, auth_entity_1.Auth, varifications_entity_1.Varification]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => varifications_module_1.VarificationsModule),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, user_repository_1.UserRepository, jwt_1.JwtService, common_1.Logger],
        exports: [user_service_1.UserService, user_repository_1.UserRepository],
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VarificationsModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(15);
const auth_module_1 = __webpack_require__(16);
const auth_entity_1 = __webpack_require__(26);
const user_entity_1 = __webpack_require__(22);
const user_module_1 = __webpack_require__(51);
const varifications_controller_1 = __webpack_require__(53);
const varifications_entity_1 = __webpack_require__(35);
const varifications_repository_1 = __webpack_require__(34);
const varifications_service_1 = __webpack_require__(56);
let VarificationsModule = class VarificationsModule {
};
VarificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.Users, auth_entity_1.Auth, varifications_entity_1.Varification]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        controllers: [varifications_controller_1.VarificationsController],
        providers: [varifications_service_1.VarificationsService, common_1.Logger, varifications_repository_1.VarificationsRepository],
        exports: [varifications_service_1.VarificationsService, varifications_repository_1.VarificationsRepository],
    })
], VarificationsModule);
exports.VarificationsModule = VarificationsModule;


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VarificationsController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(24);
const response_dto_1 = __webpack_require__(40);
const undefinedToNull_interceptor_1 = __webpack_require__(41);
const requestMail_dto_1 = __webpack_require__(54);
const varifications_entity_1 = __webpack_require__(35);
const varifyMail_dto_1 = __webpack_require__(55);
const varifications_service_1 = __webpack_require__(56);
let VarificationsController = class VarificationsController {
    constructor(varificationsService) {
        this.varificationsService = varificationsService;
    }
    requestMail(type, body) {
        return this.varificationsService.requestMail(type, body);
    }
    varifyMail(body) {
        return this.varificationsService.varifyMail(body);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: '성공',
    }),
    (0, swagger_1.ApiOperation)({ summary: '아이디 찾기, 비밀번호 찾기, 메일 인증 요청' }),
    (0, swagger_1.ApiQuery)({
        name: 'type',
        required: true,
        description: '타입',
        enum: varifications_entity_1.VerificationTypeEnum,
    }),
    (0, common_1.Post)('/requestMail'),
    __param(0, (0, common_1.Query)('type')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof varifications_entity_1.VerificationTypeEnum !== "undefined" && varifications_entity_1.VerificationTypeEnum) === "function" ? _b : Object, typeof (_c = typeof requestMail_dto_1.RequestMailDto !== "undefined" && requestMail_dto_1.RequestMailDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], VarificationsController.prototype, "requestMail", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: '성공',
    }),
    (0, swagger_1.ApiOperation)({ summary: '메일 인증' }),
    (0, common_1.Post)('/varifyMail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof varifyMail_dto_1.VarifyMailDto !== "undefined" && varifyMail_dto_1.VarifyMailDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], VarificationsController.prototype, "varifyMail", null);
VarificationsController = __decorate([
    (0, swagger_1.ApiTags)('VARIFICATIONS'),
    (0, common_1.UseInterceptors)(undefinedToNull_interceptor_1.UndefinedToNullInterceptor),
    (0, common_1.Controller)('varifications'),
    __metadata("design:paramtypes", [typeof (_a = typeof varifications_service_1.VarificationsService !== "undefined" && varifications_service_1.VarificationsService) === "function" ? _a : Object])
], VarificationsController);
exports.VarificationsController = VarificationsController;


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestMailDto = void 0;
const swagger_1 = __webpack_require__(24);
const varifications_entity_1 = __webpack_require__(35);
class RequestMailDto extends (0, swagger_1.PickType)(varifications_entity_1.Varification, ['to']) {
}
exports.RequestMailDto = RequestMailDto;


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VarifyMailDto = void 0;
const swagger_1 = __webpack_require__(24);
const varifications_entity_1 = __webpack_require__(35);
class VarifyMailDto extends (0, swagger_1.PickType)(varifications_entity_1.Varification, [
    'token',
    'key',
]) {
}
exports.VarifyMailDto = VarifyMailDto;


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VarificationsService = void 0;
const mailer_1 = __webpack_require__(57);
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(9);
const nanoid_1 = __webpack_require__(58);
const varifications_repository_1 = __webpack_require__(34);
const varifications_entity_1 = __webpack_require__(35);
const user_repository_1 = __webpack_require__(21);
const auth_repository_1 = __webpack_require__(33);
let VarificationsService = class VarificationsService {
    constructor(mailerService, config, varificationsRepository, userRepository, authRepository, logger) {
        this.mailerService = mailerService;
        this.config = config;
        this.varificationsRepository = varificationsRepository;
        this.userRepository = userRepository;
        this.authRepository = authRepository;
        this.logger = logger;
        this.generateToken = () => {
            const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
            const nanoid = (0, nanoid_1.customAlphabet)(alphabet, 10)();
            return nanoid;
        };
        this.generatePassword = () => {
            const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
            const nanoid = (0, nanoid_1.customAlphabet)(alphabet, 8)();
            return nanoid;
        };
        this.generateRandom = () => {
            const ranNum = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
            return String(ranNum);
        };
    }
    async requestMail(type, body) {
        const { to } = body;
        const token = this.generateToken();
        const key = this.generateRandom();
        const user = await this.userRepository.findUserforEmail(to);
        await this.mailerService
            .sendMail({
            to,
            from: `${this.config.get("EMAIL_ID")}@naver.com`,
            subject: "Testing Nest Mailermodule with template ✔",
            template: type === varifications_entity_1.VerificationTypeEnum.MAIL
                ? "index"
                : type === varifications_entity_1.VerificationTypeEnum.PASSWORD
                    ? "index"
                    : "findSignname",
            context: type === varifications_entity_1.VerificationTypeEnum.MAIL
                ? { code: key, name: user.name }
                : type === varifications_entity_1.VerificationTypeEnum.PASSWORD
                    ? { code: key, name: user.name }
                    : { name: user.name, signname: user.signname },
        })
            .then(async (success) => {
            this.logger.log(success);
        })
            .catch((err) => {
            this.logger.error(err);
        });
        const args = {
            type: type === varifications_entity_1.VerificationTypeEnum.MAIL
                ? varifications_entity_1.VerificationTypeEnum.MAIL
                : type === varifications_entity_1.VerificationTypeEnum.PASSWORD
                    ? varifications_entity_1.VerificationTypeEnum.PASSWORD
                    : varifications_entity_1.VerificationTypeEnum.SIGNNAME,
            signname: user.signname,
            to,
            token,
            key,
        };
        const resToken = await this.varificationsRepository.requestMail(args);
        const result = type === varifications_entity_1.VerificationTypeEnum.MAIL
            ? {
                token: resToken,
            }
            : type === varifications_entity_1.VerificationTypeEnum.PASSWORD
                ? true
                : true;
        return result;
    }
    varifyMail(body) {
        const { token, key } = body;
        if (!token)
            throw new common_1.HttpException("token is required", 400);
        if (!key)
            throw new common_1.HttpException("key is required", 400);
        return this.varificationsRepository.varifyMail(body);
    }
};
VarificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, common_1.Inject)(common_1.Logger)),
    __metadata("design:paramtypes", [typeof (_a = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof varifications_repository_1.VarificationsRepository !== "undefined" && varifications_repository_1.VarificationsRepository) === "function" ? _c : Object, typeof (_d = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _d : Object, typeof (_e = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _e : Object, typeof (_f = typeof common_1.LoggerService !== "undefined" && common_1.LoggerService) === "function" ? _f : Object])
], VarificationsService);
exports.VarificationsService = VarificationsService;


/***/ }),
/* 57 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs-modules/mailer");

/***/ }),
/* 58 */
/***/ ((module) => {

"use strict";
module.exports = require("nanoid");

/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(24);
const guard_1 = __webpack_require__(48);
const response_dto_1 = __webpack_require__(40);
const undefinedToNull_interceptor_1 = __webpack_require__(41);
const user_service_1 = __webpack_require__(60);
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    checkDuplicatedSignname(signname) {
        return this.userService.checkDuplicatedSignname(signname);
    }
    checkDuplicatedEmail(email) {
        return this.userService.checkDuplicatedEmail(email);
    }
    checkDuplicatedPhone(phone) {
        return this.userService.checkDuplicatedPhone(phone);
    }
    findUser(signname) {
        return this.userService.findUser(signname);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: '성공',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'signname',
        required: true,
        description: '회원 signname',
        type: 'string',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'signname 중복확인' }),
    (0, common_1.Get)('/check-duplicated-signname'),
    __param(0, (0, common_1.Query)('signname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkDuplicatedSignname", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: '성공',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'email',
        required: true,
        description: '회원 Email',
        type: 'string',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Email 중복확인' }),
    (0, common_1.Get)('/check-duplicated-email'),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkDuplicatedEmail", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: '성공',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'phone',
        required: true,
        description: '회원 phone',
        type: 'string',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'phone 중복확인' }),
    (0, common_1.Get)('/check-duplicated-phone'),
    __param(0, (0, common_1.Query)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkDuplicatedPhone", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: '성공',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: '회원 아이디',
        type: 'string',
    }),
    (0, swagger_1.ApiOperation)({ summary: '회원정보 조회' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findUser", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('USERS'),
    (0, common_1.UseInterceptors)(undefinedToNull_interceptor_1.UndefinedToNullInterceptor),
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);
exports.UserController = UserController;


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.UserService = void 0;
const common_1 = __webpack_require__(6);
const user_repository_1 = __webpack_require__(21);
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    findUser(signname) {
        return this.userRepository.findUser(signname);
    }
    findUserId(id) {
        return this.userRepository.findUserId(id);
    }
    async checkDuplicatedSignname(signname) {
        await this.userRepository.duplicateUser(signname);
        return true;
    }
    async checkDuplicatedEmail(email) {
        return await this.userRepository.checkDuplicatedEmail(email);
    }
    async checkDuplicatedPhone(phone) {
        return await this.userRepository.checkDuplicatedPhone(phone);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _a : Object])
], UserService);
exports.UserService = UserService;


/***/ }),
/* 61 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");

/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatModule = void 0;
const common_1 = __webpack_require__(6);
const chat_gateway_1 = __webpack_require__(63);
const chat_repository_1 = __webpack_require__(66);
const chat_service_1 = __webpack_require__(67);
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    (0, common_1.Module)({
        providers: [chat_gateway_1.ChatGateway, chat_service_1.ChatService, chat_repository_1.ChatRepository],
    })
], ChatModule);
exports.ChatModule = ChatModule;


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ChatGateway_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatGateway = void 0;
const common_1 = __webpack_require__(6);
const websockets_1 = __webpack_require__(64);
const socket_io_1 = __webpack_require__(65);
let ChatGateway = ChatGateway_1 = class ChatGateway {
    afterInit() {
        ChatGateway_1.logger.debug(`Socket Server Init Complete`);
    }
    handleConnection(client) {
        ChatGateway_1.logger.debug(`${client.id}(${client.handshake.query["name"]}) is connected!`);
    }
    handleDisconnect(client) {
        ChatGateway_1.logger.debug(`${client.id} is disconnected...`);
    }
    handleMessage(client, payload) {
        this.server.emit("msgToClient", payload);
    }
    handleConnect(client, payload) {
        console.log("1");
        this.server.emit("msgToClient", payload);
    }
};
ChatGateway.logger = new common_1.Logger(ChatGateway_1.name);
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("msgToServer"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("connect"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleConnect", null);
ChatGateway = ChatGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: "chat",
        cors: {
            origin: true,
            credentials: true,
        },
        transports: ["websocket", "polling"],
        allowEIO3: true,
    })
], ChatGateway);
exports.ChatGateway = ChatGateway;


/***/ }),
/* 64 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/websockets");

/***/ }),
/* 65 */
/***/ ((module) => {

"use strict";
module.exports = require("socket.io");

/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatRepository = void 0;
const common_1 = __webpack_require__(6);
let ChatRepository = class ChatRepository {
    constructor() { }
};
ChatRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ChatRepository);
exports.ChatRepository = ChatRepository;


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatService = void 0;
const common_1 = __webpack_require__(6);
let ChatService = class ChatService {
    constructor() { }
};
ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ChatService);
exports.ChatService = ChatService;


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayModule = void 0;
const common_1 = __webpack_require__(6);
const room_module_1 = __webpack_require__(69);
const user_module_1 = __webpack_require__(51);
const room_gateway_1 = __webpack_require__(74);
const room_gateway_service_1 = __webpack_require__(75);
let GatewayModule = class GatewayModule {
};
GatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [room_module_1.RoomModule, user_module_1.UserModule],
        providers: [room_gateway_service_1.RoomGatewayService, room_gateway_1.RoomGateway],
    })
], GatewayModule);
exports.GatewayModule = GatewayModule;


/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(15);
const user_entity_1 = __webpack_require__(22);
const room_controller_1 = __webpack_require__(70);
const room_entity_1 = __webpack_require__(29);
const room_repository_1 = __webpack_require__(73);
const room_service_1 = __webpack_require__(72);
let RoomModule = class RoomModule {
};
RoomModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.Users, room_entity_1.Room])],
        controllers: [room_controller_1.RoomController],
        providers: [room_service_1.RoomService, room_repository_1.RoomRepository],
        exports: [room_service_1.RoomService],
    })
], RoomModule);
exports.RoomModule = RoomModule;


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(24);
const guard_1 = __webpack_require__(48);
const user_decorator_1 = __webpack_require__(39);
const response_dto_1 = __webpack_require__(40);
const undefinedToNull_interceptor_1 = __webpack_require__(41);
const user_entity_1 = __webpack_require__(22);
const room_entity_1 = __webpack_require__(29);
const createRoom_dto_1 = __webpack_require__(71);
const room_service_1 = __webpack_require__(72);
let RoomController = class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    async createRoom(type, user, body) {
        return await this.roomService.createRoom(type, user, body);
    }
    findjoinRoom(user) {
        return this.roomService.findjoinRoom(user);
    }
    findAllRoom(user) {
        this.roomService.findAllRoom(user);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "방 만들기" }),
    (0, swagger_1.ApiQuery)({
        name: "type",
        required: true,
        description: "타입",
        enum: room_entity_1.RoomTypeEnum,
    }),
    (0, common_1.Post)("/create"),
    __param(0, (0, common_1.Query)("type")),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof room_entity_1.RoomTypeEnum !== "undefined" && room_entity_1.RoomTypeEnum) === "function" ? _b : Object, typeof (_c = typeof user_entity_1.Users !== "undefined" && user_entity_1.Users) === "function" ? _c : Object, typeof (_d = typeof createRoom_dto_1.CreateRoomDto !== "undefined" && createRoom_dto_1.CreateRoomDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "createRoom", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "참여된 방 찾기" }),
    (0, common_1.Post)("/findRoom/me"),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof user_entity_1.Users !== "undefined" && user_entity_1.Users) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "findjoinRoom", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "모든 방 찾기" }),
    (0, swagger_1.ApiQuery)({
        name: "type",
        required: true,
        description: "타입",
        enum: room_entity_1.RoomTypeEnum,
    }),
    (0, common_1.Post)("/findAll"),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof user_entity_1.Users !== "undefined" && user_entity_1.Users) === "function" ? _f : Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "findAllRoom", null);
RoomController = __decorate([
    (0, swagger_1.ApiTags)("ROOM"),
    (0, common_1.UseInterceptors)(undefinedToNull_interceptor_1.UndefinedToNullInterceptor),
    (0, common_1.Controller)("room"),
    __metadata("design:paramtypes", [typeof (_a = typeof room_service_1.RoomService !== "undefined" && room_service_1.RoomService) === "function" ? _a : Object])
], RoomController);
exports.RoomController = RoomController;


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRoomDto = void 0;
const swagger_1 = __webpack_require__(24);
const room_entity_1 = __webpack_require__(29);
class CreateRoomDto extends (0, swagger_1.PickType)(room_entity_1.Room, ["roomName"]) {
}
exports.CreateRoomDto = CreateRoomDto;


/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.RoomService = void 0;
const common_1 = __webpack_require__(6);
const room_repository_1 = __webpack_require__(73);
let RoomService = class RoomService {
    constructor(roomRepositry) {
        this.roomRepositry = roomRepositry;
    }
    async createRoom(type, user, body) {
        const args = Object.assign(Object.assign({ type }, body), { room_master_id: user.id, total: 0 });
        return await this.roomRepositry.createRoom(args);
    }
    async findjoinRoom(user) {
        return await this.roomRepositry.findjoinRoom(user);
    }
    findAllRoom(user) {
        this.roomRepositry.findAllRoom(user);
    }
};
RoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof room_repository_1.RoomRepository !== "undefined" && room_repository_1.RoomRepository) === "function" ? _a : Object])
], RoomService);
exports.RoomService = RoomService;


/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.RoomRepository = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(23);
const participant_eneity_1 = __webpack_require__(28);
const room_entity_1 = __webpack_require__(29);
let RoomRepository = class RoomRepository {
    constructor(connection) {
        this.connection = connection;
        this.logger = new common_1.Logger("RoomsRepository");
    }
    async createRoom(args) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const room = await queryRunner.manager.save(room_entity_1.Room, args);
            const participantArgs = {
                room_id: room.id,
                user_id: args.room_master_id,
                not_read_chatCount: 0,
            };
            await queryRunner.manager.save(participant_eneity_1.Participant, participantArgs),
                await queryRunner.commitTransaction();
            return room;
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findjoinRoom(user) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const participant = await queryRunner.manager.find(participant_eneity_1.Participant, {
                where: { user_id: user.id },
            });
            const room = await queryRunner.manager
                .createQueryBuilder()
                .select("room")
                .from(room_entity_1.Room, "room")
                .whereInIds(participant.map((v) => v.room_id))
                .getMany();
            await queryRunner.commitTransaction();
            return room;
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAllRoom(user) {
        const {} = user;
    }
};
RoomRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Connection !== "undefined" && typeorm_1.Connection) === "function" ? _a : Object])
], RoomRepository);
exports.RoomRepository = RoomRepository;


/***/ }),
/* 74 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomGateway = void 0;
const websockets_1 = __webpack_require__(64);
const room_gateway_service_1 = __webpack_require__(75);
const socket_io_1 = __webpack_require__(65);
const common_1 = __webpack_require__(6);
const events_enum_1 = __webpack_require__(76);
const socket_validation_pipe_1 = __webpack_require__(77);
const joinRoom_dto_1 = __webpack_require__(78);
let RoomGateway = class RoomGateway {
    constructor(roomGatewayService) {
        this.roomGatewayService = roomGatewayService;
    }
    afterInit(server) {
        this.roomGatewayService.onAfterInit(server);
    }
    handleConnection(client) {
        this.roomGatewayService.onConnection(client);
    }
    handleDisconnect(client) {
        this.roomGatewayService.onDisconnect(client);
    }
    async onJoinRoom(client, payload) {
        await this.roomGatewayService.onJoinRoom(client, payload);
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)(events_enum_1.EVENT.JOIN_ROOM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object, typeof (_c = typeof joinRoom_dto_1.JoinRoomDto !== "undefined" && joinRoom_dto_1.JoinRoomDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "onJoinRoom", null);
RoomGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: "*" },
        transports: ["websocket", "polling"],
        namespace: "socket/room/",
        allowEIO3: true,
    }),
    (0, common_1.UsePipes)(new socket_validation_pipe_1.WebsocketValidationPipe()),
    __metadata("design:paramtypes", [typeof (_a = typeof room_gateway_service_1.RoomGatewayService !== "undefined" && room_gateway_service_1.RoomGatewayService) === "function" ? _a : Object])
], RoomGateway);
exports.RoomGateway = RoomGateway;


/***/ }),
/* 75 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomGatewayService = void 0;
const common_1 = __webpack_require__(6);
const room_service_1 = __webpack_require__(72);
const user_service_1 = __webpack_require__(60);
let RoomGatewayService = class RoomGatewayService {
    constructor(roomsService, usersService) {
        this.roomsService = roomsService;
        this.usersService = usersService;
        this.logger = new common_1.Logger("RoomGateway");
    }
    onAfterInit(server) {
        this.setServer(server);
        this.logger.log("Initialized RoomGateway");
    }
    setServer(server) {
        this.server = server;
    }
    onConnection(client) {
        this.logger.debug(`Client connected, sid: ${client.id}`);
        client.on("disconnecting", (reason) => {
        });
    }
    onDisconnect(client) {
        this.logger.debug(`Client disconnected, sid: ${client.id}`);
    }
    async onJoinRoom(client, { room, userId }) {
        const hasJoined = client.rooms.has(room);
    }
};
RoomGatewayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof room_service_1.RoomService !== "undefined" && room_service_1.RoomService) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object])
], RoomGatewayService);
exports.RoomGatewayService = RoomGatewayService;


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EVENT = void 0;
exports.EVENT = {
    JOIN_ROOM: "joinRoom",
};


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebsocketValidationPipe = void 0;
const common_1 = __webpack_require__(6);
const websockets_1 = __webpack_require__(64);
let WebsocketValidationPipe = class WebsocketValidationPipe extends common_1.ValidationPipe {
    createExceptionFactory() {
        return (validationErrors = []) => {
            if (this.isDetailedOutputDisabled) {
                return new websockets_1.WsException("Bad request");
            }
            const errors = this.flattenValidationErrors(validationErrors);
            return new websockets_1.WsException(errors);
        };
    }
};
WebsocketValidationPipe = __decorate([
    (0, common_1.Injectable)()
], WebsocketValidationPipe);
exports.WebsocketValidationPipe = WebsocketValidationPipe;


/***/ }),
/* 78 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JoinRoomDto = void 0;
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
let JoinRoomDto = class JoinRoomDto {
};
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], JoinRoomDto.prototype, "room", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], JoinRoomDto.prototype, "userId", void 0);
JoinRoomDto = __decorate([
    (0, swagger_1.ApiTags)("socket")
], JoinRoomDto);
exports.JoinRoomDto = JoinRoomDto;


/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FriendModule = void 0;
const common_1 = __webpack_require__(6);
const friend_service_1 = __webpack_require__(80);
const friend_controller_1 = __webpack_require__(82);
const friend_repository_1 = __webpack_require__(81);
const typeorm_1 = __webpack_require__(15);
const user_entity_1 = __webpack_require__(22);
const user_module_1 = __webpack_require__(51);
const friend_eneity_1 = __webpack_require__(30);
let FriendModule = class FriendModule {
};
FriendModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.Users, friend_eneity_1.Friend]), user_module_1.UserModule],
        controllers: [friend_controller_1.FriendController],
        providers: [friend_service_1.FriendService, friend_repository_1.FriendRepository],
        exports: [friend_service_1.FriendService, friend_repository_1.FriendRepository],
    })
], FriendModule);
exports.FriendModule = FriendModule;


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.FriendService = void 0;
const common_1 = __webpack_require__(6);
const friend_repository_1 = __webpack_require__(81);
let FriendService = class FriendService {
    constructor(friendRepository) {
        this.friendRepository = friendRepository;
    }
    async addFriend(id, user) {
        return await this.friendRepository.addFriend(id, user);
    }
    async findAllFriend(user) {
        return await this.friendRepository.findAllFriend(user);
    }
    async inviteFriend(userId, friend_id, body) {
        await this.friendRepository.inviteRoom(userId, friend_id, body);
    }
};
FriendService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof friend_repository_1.FriendRepository !== "undefined" && friend_repository_1.FriendRepository) === "function" ? _a : Object])
], FriendService);
exports.FriendService = FriendService;


/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FriendRepository = void 0;
const common_1 = __webpack_require__(6);
const participant_eneity_1 = __webpack_require__(28);
const room_entity_1 = __webpack_require__(29);
const user_entity_1 = __webpack_require__(22);
const user_service_1 = __webpack_require__(60);
const typeorm_1 = __webpack_require__(23);
const friend_eneity_1 = __webpack_require__(30);
let FriendRepository = class FriendRepository {
    constructor(connection, userService) {
        this.connection = connection;
        this.userService = userService;
    }
    async addFriend(id, user) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        await this.userService.findUserId(id);
        try {
            const args = {
                user_id: user.id,
                friend_id: id,
            };
            const friend = await queryRunner.manager.save(friend_eneity_1.Friend, args);
            await queryRunner.commitTransaction();
            return;
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findAllFriend(user) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const friend = await queryRunner.manager
                .find(friend_eneity_1.Friend, {
                where: {
                    user_id: user.id,
                },
            })
                .then(async (v) => {
                return await queryRunner.manager
                    .createQueryBuilder()
                    .select("user.id")
                    .addSelect("user.method")
                    .addSelect("user.signname")
                    .addSelect("user.name")
                    .addSelect("user.email")
                    .addSelect("user.phone")
                    .addSelect("user.varifymail")
                    .addSelect("user.withdraw")
                    .addSelect("user.updated_at")
                    .addSelect("user.created_at")
                    .from(user_entity_1.Users, "user")
                    .whereInIds(v.map((v) => v.friend_id))
                    .andWhere({ withdraw: "false" })
                    .getMany();
            });
            await queryRunner.commitTransaction();
            return friend;
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
    }
    async inviteRoom(user_id, friend_id, body) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const room = await queryRunner.manager.findOne(room_entity_1.Room, {
            where: { id: body.id },
        });
        if (!room) {
            throw new common_1.HttpException("Room not found :: no data", 400);
        }
        const friend = await queryRunner.manager.findOne(friend_eneity_1.Friend, {
            where: { friend_id },
        });
        if (!friend) {
            throw new common_1.HttpException("Friend not found :: no data", 400);
        }
        const participant = await queryRunner.manager.findOne(participant_eneity_1.Participant, {
            where: { room_id: room.id, user_id: friend_id },
        });
        if (participant) {
            throw new common_1.HttpException("Participant already join :: duplicated id", 400);
        }
        try {
            const participantArgs = {
                room_id: room.id,
                user_id: friend_id,
                not_read_chatCount: 0,
            };
            await Promise.all([
                queryRunner.manager.save(participant_eneity_1.Participant, participantArgs),
                queryRunner.manager
                    .createQueryBuilder()
                    .update(room_entity_1.Room)
                    .set({ total: room.total + 1 })
                    .where("id = :id", { id: room.id })
                    .execute(),
            ]);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
    }
};
FriendRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Connection !== "undefined" && typeorm_1.Connection) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object])
], FriendRepository);
exports.FriendRepository = FriendRepository;


/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FriendController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(24);
const guard_1 = __webpack_require__(48);
const user_decorator_1 = __webpack_require__(39);
const response_dto_1 = __webpack_require__(40);
const undefinedToNull_interceptor_1 = __webpack_require__(41);
const user_entity_1 = __webpack_require__(22);
const inviteFriend_dto_1 = __webpack_require__(94);
const friend_service_1 = __webpack_require__(80);
let FriendController = class FriendController {
    constructor(friendService) {
        this.friendService = friendService;
    }
    async addFriend(id, user) {
        return await this.friendService.addFriend(id, user);
    }
    async findAllFriend(user) {
        return await this.friendService.findAllFriend(user);
    }
    async joinRoom(user, friend_id, body) {
        await this.friendService.inviteFriend(user.id, friend_id, body);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "친구 추가" }),
    (0, swagger_1.ApiParam)({
        name: "id",
        required: true,
        description: "추가시킬 친구 아이디",
        type: "int",
    }),
    (0, common_1.Post)("/add/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_b = typeof user_entity_1.Users !== "undefined" && user_entity_1.Users) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "addFriend", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "친구 찾기" }),
    (0, common_1.Post)("/findAll"),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof user_entity_1.Users !== "undefined" && user_entity_1.Users) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "findAllFriend", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "친구 초대" }),
    (0, swagger_1.ApiParam)({
        name: "friend_id",
        required: true,
        description: "친구 초대",
        type: "int",
    }),
    (0, common_1.Post)("/invite/:friend_id"),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)("friend_id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof user_entity_1.Users !== "undefined" && user_entity_1.Users) === "function" ? _d : Object, Number, typeof (_e = typeof inviteFriend_dto_1.InviteFriendDto !== "undefined" && inviteFriend_dto_1.InviteFriendDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "joinRoom", null);
FriendController = __decorate([
    (0, swagger_1.ApiTags)("FRIEND"),
    (0, common_1.UseInterceptors)(undefinedToNull_interceptor_1.UndefinedToNullInterceptor),
    (0, common_1.Controller)("friend"),
    __metadata("design:paramtypes", [typeof (_a = typeof friend_service_1.FriendService !== "undefined" && friend_service_1.FriendService) === "function" ? _a : Object])
], FriendController);
exports.FriendController = FriendController;


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.winstonLogger = void 0;
const nest_winston_1 = __webpack_require__(84);
const winston_daily_rotate_file_1 = __importDefault(__webpack_require__(85));
const winston_1 = __importDefault(__webpack_require__(86));
const path_1 = __importDefault(__webpack_require__(11));
const app_root_path_1 = __importDefault(__webpack_require__(12));
const env = process.env.NODE_ENV;
const logDir = path_1.default.normalize(`${app_root_path_1.default}/logs`);
const dailyOptions = (level) => {
    return {
        level,
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + `/${level}`,
        filename: `%DATE%.${level}.log`,
        maxFiles: 30,
        zippedArchive: true,
    };
};
exports.winstonLogger = nest_winston_1.WinstonModule.createLogger({
    transports: [
        new winston_1.default.transports.Console({
            level: env === 'prod' ? 'http' : 'silly',
            format: env === 'production'
                ?
                    winston_1.default.format.simple()
                : winston_1.default.format.combine(winston_1.default.format.timestamp(), nest_winston_1.utilities.format.nestLike('server', {
                    prettyPrint: true,
                })),
        }),
        new winston_daily_rotate_file_1.default(dailyOptions('info')),
        new winston_daily_rotate_file_1.default(dailyOptions('error')),
    ],
});


/***/ }),
/* 84 */
/***/ ((module) => {

"use strict";
module.exports = require("nest-winston");

/***/ }),
/* 85 */
/***/ ((module) => {

"use strict";
module.exports = require("winston-daily-rotate-file");

/***/ }),
/* 86 */
/***/ ((module) => {

"use strict";
module.exports = require("winston");

/***/ }),
/* 87 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.SuccessInterceptor = void 0;
const common_1 = __webpack_require__(6);
const operators_1 = __webpack_require__(88);
const moment_1 = __importDefault(__webpack_require__(14));
let SuccessInterceptor = class SuccessInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => ({
            success: true,
            data,
            timestamp: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
        })));
    }
};
SuccessInterceptor = __decorate([
    (0, common_1.Injectable)()
], SuccessInterceptor);
exports.SuccessInterceptor = SuccessInterceptor;


/***/ }),
/* 88 */
/***/ ((module) => {

"use strict";
module.exports = require("rxjs/operators");

/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

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
exports.HttpExceptionFilter = void 0;
const common_1 = __webpack_require__(6);
const moment_1 = __importDefault(__webpack_require__(14));
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor() {
        this.DEFAULT_TIMEZONE = 'Asia/Seoul';
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        const err = exception.getResponse();
        if (typeof err !== 'string') {
            return response.status(status).json({
                success: false,
                code: status,
                data: err.message,
                timestamp: (0, moment_1.default)().format(),
            });
        }
        response.status(status).json({
            success: false,
            code: status,
            data: err,
            timestamp: (0, moment_1.default)().format(),
        });
    }
};
HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RedisIoAdapter = void 0;
const platform_socket_io_1 = __webpack_require__(91);
const redis_adapter_1 = __webpack_require__(92);
const redis_1 = __webpack_require__(93);
const common_1 = __webpack_require__(6);
class RedisIoAdapter extends platform_socket_io_1.IoAdapter {
    constructor(appOrHttpServer, configService) {
        super(appOrHttpServer);
        this.configService = configService;
        this.logger = new common_1.Logger("RedisIoAdapter");
        this.REDIS_HOST = this.configService.get("REDIS_URL");
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


/***/ }),
/* 91 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/platform-socket.io");

/***/ }),
/* 92 */
/***/ ((module) => {

"use strict";
module.exports = require("@socket.io/redis-adapter");

/***/ }),
/* 93 */
/***/ ((module) => {

"use strict";
module.exports = require("redis");

/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InviteFriendDto = void 0;
const swagger_1 = __webpack_require__(24);
const room_entity_1 = __webpack_require__(29);
class InviteFriendDto extends (0, swagger_1.PickType)(room_entity_1.Room, ["id"]) {
}
exports.InviteFriendDto = InviteFriendDto;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("ed0614f719387d70a507")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = __webpack_require__.hmrS_require = __webpack_require__.hmrS_require || {
/******/ 			0: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no chunk install function needed
/******/ 		
/******/ 		// no chunk loading
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			var update = require("./" + __webpack_require__.hu(chunkId));
/******/ 			var updatedModules = update.modules;
/******/ 			var runtime = update.runtime;
/******/ 			for(var moduleId in updatedModules) {
/******/ 				if(__webpack_require__.o(updatedModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = updatedModules[moduleId];
/******/ 					if(updatedModulesList) updatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 		}
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.requireHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.require = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.require = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.requireHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			return Promise.resolve().then(function() {
/******/ 				return require("./" + __webpack_require__.hmrF());
/******/ 			})['catch'](function(err) { if(err.code !== 'MODULE_NOT_FOUND') throw err; });
/******/ 		}
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__(0);
/******/ 	var __webpack_exports__ = __webpack_require__(3);
/******/ 	
/******/ })()
;