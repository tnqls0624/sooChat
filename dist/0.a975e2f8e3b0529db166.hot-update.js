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
const jwt_strategy_1 = __webpack_require__(36);
const auth_controller_1 = __webpack_require__(38);
const user_entity_1 = __webpack_require__(22);
const auth_entity_1 = __webpack_require__(26);
const auth_repository_1 = __webpack_require__(30);
const varifications_entity_1 = __webpack_require__(32);
const user_module_1 = __webpack_require__(51);
const varifications_module_1 = __webpack_require__(55);
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
            (0, common_1.forwardRef)(() => varifications_module_1.VarificationsModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, auth_repository_1.AuthRepository, common_1.Logger],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("af8cd5e3ee87e7452578")
/******/ })();
/******/ 
/******/ }
;