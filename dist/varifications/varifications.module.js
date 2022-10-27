"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarificationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_entity_1 = require("../auth/domain/entity/auth.entity");
const auth_repository_1 = require("../auth/infra/auth.repository");
const user_entity_1 = require("../user/domain/entity/user.entity");
const user_repository_1 = require("../user/infra/user.repository");
const varifications_controller_1 = require("./controller/varifications.controller");
const varifications_entity_1 = require("./domain/entity/varifications.entity");
const varifications_repository_1 = require("./infra/varifications.repository");
const varifications_service_1 = require("./service/varifications.service");
let VarificationsModule = class VarificationsModule {
};
VarificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.Users, auth_entity_1.Auth, varifications_entity_1.Varification])],
        controllers: [varifications_controller_1.VarificationsController],
        providers: [
            varifications_service_1.VarificationsService,
            common_1.Logger,
            user_repository_1.UserRepository,
            varifications_repository_1.VarificationsRepository,
            auth_repository_1.AuthRepository,
        ],
    })
], VarificationsModule);
exports.VarificationsModule = VarificationsModule;
//# sourceMappingURL=varifications.module.js.map