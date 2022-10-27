"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const auth_service_1 = require("./service/auth.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const jwt_strategy_1 = require("./service/jwt.strategy");
const auth_controller_1 = require("./controller/auth.controller");
const user_entity_1 = require("../user/domain/entity/user.entity");
const auth_entity_1 = require("./domain/entity/auth.entity");
const auth_repository_1 = require("./infra/auth.repository");
const user_repository_1 = require("../user/infra/user.repository");
const varifications_service_1 = require("../varifications/service/varifications.service");
const varifications_repository_1 = require("../varifications/infra/varifications.repository");
const varifications_entity_1 = require("../varifications/domain/entity/varifications.entity");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt', session: false }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (config) => ({
                    secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
                    signOptions: {
                        expiresIn: config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
                    },
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.Users, auth_entity_1.Auth, varifications_entity_1.Varification]),
        ],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            auth_repository_1.AuthRepository,
            user_repository_1.UserRepository,
            varifications_service_1.VarificationsService,
            varifications_repository_1.VarificationsRepository,
            common_1.Logger,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map