"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 70:
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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(24);
const guard_1 = __webpack_require__(49);
const user_decorator_1 = __webpack_require__(40);
const response_dto_1 = __webpack_require__(41);
const undefinedToNull_interceptor_1 = __webpack_require__(42);
const user_entity_1 = __webpack_require__(22);
const room_entity_1 = __webpack_require__(71);
const createRoom_dto_1 = __webpack_require__(72);
const room_service_1 = __webpack_require__(73);
let RoomController = class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    createRoom(type, user, body) {
        this.roomService.createRoom(type, user, body);
    }
    joinRoom(user, body) {
        this.roomService.joinRoom(4, body.existingRoomMembersLength || 0, user.id);
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
    __metadata("design:returntype", void 0)
], RoomController.prototype, "createRoom", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "방 참여" }),
    (0, swagger_1.ApiQuery)({
        name: "type",
        required: true,
        description: "타입",
        enum: room_entity_1.RoomTypeEnum,
    }),
    (0, common_1.Post)("/join"),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof user_entity_1.Users !== "undefined" && user_entity_1.Users) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", void 0)
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
    __metadata("design:paramtypes", [typeof (_f = typeof user_entity_1.Users !== "undefined" && user_entity_1.Users) === "function" ? _f : Object]),
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
/******/ 	__webpack_require__.h = () => ("4bb469f2c7056fb8f3d0")
/******/ })();
/******/ 
/******/ }
;