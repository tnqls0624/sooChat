"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 91:
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FriendController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(24);
const guard_1 = __webpack_require__(47);
const user_decorator_1 = __webpack_require__(38);
const response_dto_1 = __webpack_require__(39);
const undefinedToNull_interceptor_1 = __webpack_require__(40);
const user_entity_1 = __webpack_require__(22);
const friend_service_1 = __webpack_require__(90);
let FriendController = class FriendController {
    constructor(friendService) {
        this.friendService = friendService;
    }
    async addFriend(param, user) {
        return await this.friendService.addFriend(param, user);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "친구 추가" }),
    (0, swagger_1.ApiParam)({
        name: "signname",
        required: true,
        description: "추가시킬 친구 아이디",
        type: "string",
    }),
    (0, common_1.Post)("/add/:signname"),
    __param(0, (0, common_1.Param)("signname")),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof user_entity_1.Users !== "undefined" && user_entity_1.Users) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "addFriend", null);
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
/******/ 	__webpack_require__.h = () => ("404b6a5f42e921b87209")
/******/ })();
/******/ 
/******/ }
;