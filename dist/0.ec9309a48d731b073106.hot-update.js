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
const response_dto_1 = __webpack_require__(39);
const undefinedToNull_interceptor_1 = __webpack_require__(40);
let FriendController = class FriendController {
    constructor() { }
    async addFriend(param, user, body) {
        return await this.roomService.createRoom(type, user, body);
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
        name: "id",
        required: true,
        description: "추가시킬 친구 아이디",
        type: "number",
    }),
    (0, common_1.Post)("/add/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, User()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_a = typeof Users !== "undefined" && Users) === "function" ? _a : Object, typeof (_b = typeof CreateRoomDto !== "undefined" && CreateRoomDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], FriendController.prototype, "addFriend", null);
FriendController = __decorate([
    (0, swagger_1.ApiTags)("FRIEND"),
    (0, common_1.UseInterceptors)(undefinedToNull_interceptor_1.UndefinedToNullInterceptor),
    (0, common_1.Controller)("friend"),
    __metadata("design:paramtypes", [])
], FriendController);
exports.FriendController = FriendController;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("bfd2aaf4498f7cb97c32")
/******/ })();
/******/ 
/******/ }
;