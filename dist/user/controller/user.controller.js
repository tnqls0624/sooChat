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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guard_1 = require("../../auth/service/guard");
const response_dto_1 = require("../../common/responseDto/response.dto");
const undefinedToNull_interceptor_1 = require("../../interceptors/undefinedToNull.interceptor");
const user_service_1 = require("../service/user.service");
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
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map