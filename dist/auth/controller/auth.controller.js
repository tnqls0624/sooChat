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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../../common/decorators/user.decorator");
const response_dto_1 = require("../../common/responseDto/response.dto");
const undefinedToNull_interceptor_1 = require("../../interceptors/undefinedToNull.interceptor");
const joinUser_dto_1 = require("../dto/action/joinUser.dto");
const loginUser_dto_1 = require("../dto/action/loginUser.dto");
const reissueToken_dto_1 = require("../dto/action/reissueToken.dto");
const updateUser_dto_1 = require("../dto/action/updateUser.dto");
const user_dto_1 = require("../../user/dto/user/user.dto");
const auth_service_1 = require("../service/auth.service");
const guard_1 = require("../service/guard");
const findPasswordChange_dto_copy_1 = require("../dto/action/findPasswordChange.dto copy");
const passwordChange_dto_1 = require("../dto/action/passwordChange.dto");
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
    reissueToken(signname, body) {
        return this.authService.reissueToken(signname, body);
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
        description: '성공',
    }),
    (0, swagger_1.ApiOperation)({ summary: '회원가입' }),
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [joinUser_dto_1.JoinUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: '성공',
    }),
    (0, swagger_1.ApiOperation)({ summary: '로그인' }),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginUser_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: '성공',
    }),
    (0, swagger_1.ApiOperation)({ summary: '비밀번호 변경' }),
    (0, common_1.Post)('/password'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto, passwordChange_dto_1.PasswordChangeDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: '성공',
    }),
    (0, swagger_1.ApiOperation)({ summary: '비밀번호 변경' }),
    (0, swagger_1.ApiParam)({
        name: 'key',
        required: true,
        description: '인증번호',
        type: 'string',
    }),
    (0, common_1.Post)('/find-password/:key'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, findPasswordChange_dto_copy_1.FindPasswordChangeDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findPasswordChange", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: '성공',
    }),
    (0, swagger_1.ApiOperation)({ summary: '로그인 정보 조회' }),
    (0, common_1.Get)('/login'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getLoginUser", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: '성공',
    }),
    (0, swagger_1.ApiOperation)({ summary: '토큰 재발급' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: '유저 아이디',
        type: 'string',
    }),
    (0, common_1.Post)('/refreshToken/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reissueToken_dto_1.ReissueTokenDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "reissueToken", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: '성공',
    }),
    (0, swagger_1.ApiOperation)({ summary: '회원정보 수정' }),
    (0, common_1.Put)('/login'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto, updateUser_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: '성공',
    }),
    (0, swagger_1.ApiOperation)({ summary: '회원 탈퇴' }),
    (0, common_1.Delete)('/login'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "deleteUser", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: '성공',
    }),
    (0, swagger_1.ApiOperation)({ summary: '카카오 로그인 콜백' }),
    (0, common_1.Get)('/kakao/callback'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "kakaoCallback", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: '성공',
    }),
    (0, swagger_1.ApiOperation)({ summary: '구글 로그인 콜백' }),
    (0, common_1.Get)('/google/callback'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleCallback", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: '성공',
    }),
    (0, swagger_1.ApiOperation)({ summary: '네이버 로그인 콜백' }),
    (0, common_1.Get)('/naver/callback'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "naverCallback", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('AUTH'),
    (0, common_1.UseInterceptors)(undefinedToNull_interceptor_1.UndefinedToNullInterceptor),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map