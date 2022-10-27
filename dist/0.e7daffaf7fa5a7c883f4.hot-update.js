"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 16:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const jwt_strategy_1 = __webpack_require__(38);
const auth_controller_1 = __webpack_require__(40);
const user_entity_1 = __webpack_require__(22);
const auth_entity_1 = __webpack_require__(26);
const auth_repository_1 = __webpack_require__(32);
const varifications_service_1 = __webpack_require__(35);
const varifications_repository_1 = __webpack_require__(33);
const varifications_entity_1 = __webpack_require__(34);
const user_module_1 = __webpack_require__(53);
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
        ],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            auth_repository_1.AuthRepository,
            varifications_service_1.VarificationsService,
            varifications_repository_1.VarificationsRepository,
            common_1.Logger,
        ],
        exports: [auth_service_1.AuthService, auth_repository_1.AuthRepository],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("8e27bfe52665452ba8b2")
/******/ })();
/******/ 
/******/ }
;