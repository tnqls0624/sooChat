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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomGateway = void 0;
const websockets_1 = __webpack_require__(71);
const room_gateway_service_1 = __webpack_require__(75);
const socket_io_1 = __webpack_require__(72);
const guard_1 = __webpack_require__(48);
const common_1 = __webpack_require__(6);
const event_enum_1 = __webpack_require__(73);
const socket_validation_pipe_1 = __webpack_require__(74);
const dto_1 = __webpack_require__(76);
let RoomGateway = class RoomGateway {
    constructor(roomGatewayService) {
        this.roomGatewayService = roomGatewayService;
    }
    afterInit(server) {
        this.roomGatewayService.onAfterInit(server);
    }
    handleConnection(client) {
        this.roomGatewayService.onConnection(client);
    }
    handleDisconnect(client) {
        this.roomGatewayService.onDisconnect(client);
    }
    async onJoinRoom(client, payload) {
        await this.roomGatewayService.onJoinRoom(client, payload);
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.JOIN_ROOM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object, typeof (_c = typeof dto_1.JoinRoomPayload !== "undefined" && dto_1.JoinRoomPayload) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "onJoinRoom", null);
RoomGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: "*" },
        transports: ["websocket", "polling"],
        namespace: "socket/room/",
    }),
    (0, common_1.UsePipes)(new socket_validation_pipe_1.WebsocketValidationPipe()),
    (0, common_1.UseGuards)(guard_1.WsJwtGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof room_gateway_service_1.RoomGatewayService !== "undefined" && room_gateway_service_1.RoomGatewayService) === "function" ? _a : Object])
], RoomGateway);
exports.RoomGateway = RoomGateway;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("14efe4da82c64de4667f")
/******/ })();
/******/ 
/******/ }
;