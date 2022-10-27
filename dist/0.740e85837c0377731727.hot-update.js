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
const chat_module_1 = __webpack_require__(59);
const gateway_module_1 = __webpack_require__(77);
const room_module_1 = __webpack_require__(79);
const room_entity_1 = __webpack_require__(82);
const participant_eneity_1 = __webpack_require__(83);
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
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, logger_middleware_1.LoggerMiddleware, common_1.Logger],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ 83:
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Participant = void 0;
const typeorm_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
const auth_entity_1 = __webpack_require__(26);
const class_transformer_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(22);
let Participant = class Participant {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    (0, typeorm_1.OneToOne)(() => auth_entity_1.Auth, (auth) => auth.user_id),
    __metadata("design:type", Number)
], Participant.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "노는방",
        description: "방이름",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 20, comment: "방이름", unique: true }),
    __metadata("design:type", String)
], Participant.prototype, "roomName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "4",
        description: "읽지 않은 채팅 수",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)({
        type: "varchar",
        name: "not_read_chatCount",
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
    (0, typeorm_1.Column)({ type: "varchar", comment: "마지막으로 읽은 채팅 아이디" }),
    __metadata("design:type", String)
], Participant.prototype, "lastReadChatId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "방식별아이디",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)({
        type: "int",
        name: "room_id",
    }),
    __metadata("design:type", Number)
], Participant.prototype, "roomId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.Users, (user) => user.signname),
    __metadata("design:type", Array)
], Participant.prototype, "user", void 0);
Participant = __decorate([
    (0, typeorm_1.Index)("id", ["id"], { unique: true }),
    (0, typeorm_1.Entity)({ name: "participant" })
], Participant);
exports.Participant = Participant;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("bb25af3c17844f3e9ca5")
/******/ })();
/******/ 
/******/ }
;