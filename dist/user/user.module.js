"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const auth_entity_1 = require("../auth/domain/entity/auth.entity");
const auth_repository_1 = require("../auth/infra/auth.repository");
const auth_service_1 = require("../auth/service/auth.service");
const varifications_entity_1 = require("../varifications/domain/entity/varifications.entity");
const varifications_repository_1 = require("../varifications/infra/varifications.repository");
const varifications_service_1 = require("../varifications/service/varifications.service");
const user_controller_1 = require("./controller/user.controller");
const user_entity_1 = require("./domain/entity/user.entity");
const user_repository_1 = require("./infra/user.repository");
const user_service_1 = require("./service/user.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.Users, auth_entity_1.Auth, varifications_entity_1.Varification])],
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            user_repository_1.UserRepository,
            auth_service_1.AuthService,
            jwt_1.JwtService,
            auth_repository_1.AuthRepository,
            varifications_service_1.VarificationsService,
            varifications_repository_1.VarificationsRepository,
            common_1.Logger,
        ],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map