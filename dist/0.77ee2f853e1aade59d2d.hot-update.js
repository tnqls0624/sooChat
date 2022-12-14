"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 82:
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
        description: "??????",
    }),
    (0, swagger_1.ApiOperation)({ summary: "?????? ??????" }),
    (0, swagger_1.ApiParam)({
        name: "id",
        required: true,
        description: "???????????? ?????? ?????????",
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
        description: "??????",
    }),
    (0, swagger_1.ApiOperation)({ summary: "?????? ??????" }),
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
        description: "??????",
    }),
    (0, swagger_1.ApiOperation)({ summary: "?????? ??????" }),
    (0, swagger_1.ApiParam)({
        name: "friend_id",
        required: true,
        description: "?????? ??????",
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


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("caf43ead4ff18d06c511")
/******/ })();
/******/ 
/******/ }
;