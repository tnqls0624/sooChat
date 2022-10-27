"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 80:
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
exports.RoomController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(24);
const response_dto_1 = __webpack_require__(40);
const undefinedToNull_interceptor_1 = __webpack_require__(41);
const createRoom_dto_1 = __webpack_require__(85);
const room_service_1 = __webpack_require__(81);
let RoomController = class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    createRoom(body) {
        this.roomService.createRoom(body);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "성공",
    }),
    (0, swagger_1.ApiOperation)({ summary: "방 만들기" }),
    (0, common_1.Post)("/create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof createRoom_dto_1.CreateRoomDto !== "undefined" && createRoom_dto_1.CreateRoomDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "createRoom", null);
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
/******/ 	__webpack_require__.h = () => ("517d9b41245717811511")
/******/ })();
/******/ 
/******/ }
;