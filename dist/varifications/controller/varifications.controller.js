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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarificationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../common/responseDto/response.dto");
const undefinedToNull_interceptor_1 = require("../../interceptors/undefinedToNull.interceptor");
const requestMail_dto_1 = require("../dto/requestMail.dto");
const varifications_entity_1 = require("../domain/entity/varifications.entity");
const varifyMail_dto_1 = require("../dto/varifyMail.dto");
const varifications_service_1 = require("../service/varifications.service");
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
    __metadata("design:paramtypes", [String, requestMail_dto_1.RequestMailDto]),
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
    __metadata("design:paramtypes", [varifyMail_dto_1.VarifyMailDto]),
    __metadata("design:returntype", void 0)
], VarificationsController.prototype, "varifyMail", null);
VarificationsController = __decorate([
    (0, swagger_1.ApiTags)('VARIFICATIONS'),
    (0, common_1.UseInterceptors)(undefinedToNull_interceptor_1.UndefinedToNullInterceptor),
    (0, common_1.Controller)('varifications'),
    __metadata("design:paramtypes", [varifications_service_1.VarificationsService])
], VarificationsController);
exports.VarificationsController = VarificationsController;
//# sourceMappingURL=varifications.controller.js.map