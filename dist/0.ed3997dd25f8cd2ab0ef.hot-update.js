"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 69:
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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(24);
const guard_1 = __webpack_require__(47);
const user_decorator_1 = __webpack_require__(38);
const response_dto_1 = __webpack_require__(39);
const undefinedToNull_interceptor_1 = __webpack_require__(40);
const user_entity_1 = __webpack_require__(22);
const room_entity_1 = __webpack_require__(29);
const createRoom_dto_1 = __webpack_require__(70);
const room_service_1 = __webpack_require__(71);
let RoomController = class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    async createRoom(type, user, body) {
        return await this.roomService.createRoom(type, user, body);
    }
    findjoinRoom(user) {
        return this.roomService.findjoinRoom(user);
    }
    async joinRoom(user, id) {
        await this.roomService.joinRoom(id, user.id);
    }
    findAllRoom(user) {
        this.roomService.findAllRoom(user);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "방 만들기" }),
    (0, swagger_1.ApiQuery)({
        name: "type",
        required: true,
        description: "타입",
        enum: room_entity_1.RoomTypeEnum,
    }),
    (0, common_1.Post)("/create"),
    __param(0, (0, common_1.Query)("type")),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof room_entity_1.RoomTypeEnum !== "undefined" && room_entity_1.RoomTypeEnum) === "function" ? _b : Object, typeof (_c = typeof user_entity_1.Users !== "undefined" && user_entity_1.Users) === "function" ? _c : Object, typeof (_d = typeof createRoom_dto_1.CreateRoomDto !== "undefined" && createRoom_dto_1.CreateRoomDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "createRoom", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "참여된 방 찾기" }),
    (0, common_1.Post)("/findRoom/me"),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof user_entity_1.Users !== "undefined" && user_entity_1.Users) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "findjoinRoom", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "방 초대" }),
    (0, swagger_1.ApiParam)({
        name: "id",
        required: true,
        description: "참가시킬 방 아이디",
        type: "number",
    }),
    (0, common_1.Post)("/invite/:id"),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof user_entity_1.Users !== "undefined" && user_entity_1.Users) === "function" ? _f : Object, Number]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "joinRoom", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "모든 방 찾기" }),
    (0, swagger_1.ApiQuery)({
        name: "type",
        required: true,
        description: "타입",
        enum: room_entity_1.RoomTypeEnum,
    }),
    (0, common_1.Post)("/findAll"),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof user_entity_1.Users !== "undefined" && user_entity_1.Users) === "function" ? _g : Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "findAllRoom", null);
RoomController = __decorate([
    (0, swagger_1.ApiTags)("ROOM"),
    (0, common_1.UseInterceptors)(undefinedToNull_interceptor_1.UndefinedToNullInterceptor),
    (0, common_1.Controller)("room"),
    __metadata("design:paramtypes", [typeof (_a = typeof room_service_1.RoomService !== "undefined" && room_service_1.RoomService) === "function" ? _a : Object])
], RoomController);
exports.RoomController = RoomController;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d66cb48ed760e2f09080")
/******/ })();
/******/ 
/******/ }
;