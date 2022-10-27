"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 75:
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomGateway = void 0;
const websockets_1 = __webpack_require__(71);
const room_gateway_service_1 = __webpack_require__(75);
const socket_io_1 = __webpack_require__(72);
const guard_1 = __webpack_require__(48);
const common_1 = __webpack_require__(6);
const event_enum_1 = __webpack_require__(73);
const socket_validation_pipe_1 = __webpack_require__(74);
const dto_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './dto'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
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
    async handleLeaveRoom(client, payload) {
        await this.roomGatewayService.onLeaveRoom(client, payload);
    }
    async onKickUser(client, payload) {
        await this.roomGatewayService.onKickUser(client, payload);
    }
    onChatMessage(client, message) {
        this.roomGatewayService.onChatMessage(client, message);
    }
    onCallUser(client, payload) {
        this.roomGatewayService.onCallUser(client, payload);
    }
    onMakeAnswer(client, payload) {
        this.roomGatewayService.onMakeAnswer(client, payload);
    }
    onIceCandidate(client, payload) {
        this.roomGatewayService.onIceCandidate(client, payload);
    }
    async recordTime(client, payload) {
        await this.roomGatewayService.onRecordTime(client, payload);
    }
    onVideoStateChange(client, payload) {
        this.roomGatewayService.onMediaStateChange(event_enum_1.EVENT.VIDEO_STATE_CHANGE, client, payload);
    }
    onAudioStateChange(client, payload) {
        this.roomGatewayService.onMediaStateChange(event_enum_1.EVENT.AUDIO_STATE_CHANGE, client, payload);
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.JOIN_ROOM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object, typeof (_c = typeof dto_1.JoinRoomPayload !== "undefined" && dto_1.JoinRoomPayload) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "onJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.LEAVE_ROOM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object, typeof (_e = typeof dto_1.LeaveRoomPayload !== "undefined" && dto_1.LeaveRoomPayload) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "handleLeaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.KICK_USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _f : Object, typeof (_g = typeof dto_1.KickUserPayload !== "undefined" && dto_1.KickUserPayload) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "onKickUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.CHAT_MESSAGE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _h : Object, typeof (_j = typeof dto_1.ChatMessagePayload !== "undefined" && dto_1.ChatMessagePayload) === "function" ? _j : Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "onChatMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.CALL_USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _k : Object, typeof (_l = typeof dto_1.CallOfferPayload !== "undefined" && dto_1.CallOfferPayload) === "function" ? _l : Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "onCallUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.MAKE_ANSWER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _m : Object, typeof (_o = typeof dto_1.AnswerOfferPayload !== "undefined" && dto_1.AnswerOfferPayload) === "function" ? _o : Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "onMakeAnswer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.ICE_CANDIDATE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _p : Object, typeof (_q = typeof dto_1.CandidatePayload !== "undefined" && dto_1.CandidatePayload) === "function" ? _q : Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "onIceCandidate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.RECORD_TIME),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_r = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _r : Object, typeof (_s = typeof dto_1.RecordPayload !== "undefined" && dto_1.RecordPayload) === "function" ? _s : Object]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "recordTime", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.VIDEO_STATE_CHANGE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _t : Object, typeof (_u = typeof dto_1.MediaStateChangePayload !== "undefined" && dto_1.MediaStateChangePayload) === "function" ? _u : Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "onVideoStateChange", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.AUDIO_STATE_CHANGE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_v = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _v : Object, typeof (_w = typeof dto_1.MediaStateChangePayload !== "undefined" && dto_1.MediaStateChangePayload) === "function" ? _w : Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "onAudioStateChange", null);
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


/***/ }),

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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomGateway = void 0;
const websockets_1 = __webpack_require__(71);
const room_gateway_service_1 = __webpack_require__(75);
const socket_io_1 = __webpack_require__(72);
const guard_1 = __webpack_require__(48);
const common_1 = __webpack_require__(6);
const event_enum_1 = __webpack_require__(73);
const socket_validation_pipe_1 = __webpack_require__(74);
const dto_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './dto'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
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
    async handleLeaveRoom(client, payload) {
        await this.roomGatewayService.onLeaveRoom(client, payload);
    }
    async onKickUser(client, payload) {
        await this.roomGatewayService.onKickUser(client, payload);
    }
    onChatMessage(client, message) {
        this.roomGatewayService.onChatMessage(client, message);
    }
    onCallUser(client, payload) {
        this.roomGatewayService.onCallUser(client, payload);
    }
    onMakeAnswer(client, payload) {
        this.roomGatewayService.onMakeAnswer(client, payload);
    }
    onIceCandidate(client, payload) {
        this.roomGatewayService.onIceCandidate(client, payload);
    }
    async recordTime(client, payload) {
        await this.roomGatewayService.onRecordTime(client, payload);
    }
    onVideoStateChange(client, payload) {
        this.roomGatewayService.onMediaStateChange(event_enum_1.EVENT.VIDEO_STATE_CHANGE, client, payload);
    }
    onAudioStateChange(client, payload) {
        this.roomGatewayService.onMediaStateChange(event_enum_1.EVENT.AUDIO_STATE_CHANGE, client, payload);
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.JOIN_ROOM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object, typeof (_c = typeof dto_1.JoinRoomPayload !== "undefined" && dto_1.JoinRoomPayload) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "onJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.LEAVE_ROOM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object, typeof (_e = typeof dto_1.LeaveRoomPayload !== "undefined" && dto_1.LeaveRoomPayload) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "handleLeaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.KICK_USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _f : Object, typeof (_g = typeof dto_1.KickUserPayload !== "undefined" && dto_1.KickUserPayload) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "onKickUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.CHAT_MESSAGE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _h : Object, typeof (_j = typeof dto_1.ChatMessagePayload !== "undefined" && dto_1.ChatMessagePayload) === "function" ? _j : Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "onChatMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.CALL_USER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _k : Object, typeof (_l = typeof dto_1.CallOfferPayload !== "undefined" && dto_1.CallOfferPayload) === "function" ? _l : Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "onCallUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.MAKE_ANSWER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _m : Object, typeof (_o = typeof dto_1.AnswerOfferPayload !== "undefined" && dto_1.AnswerOfferPayload) === "function" ? _o : Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "onMakeAnswer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.ICE_CANDIDATE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _p : Object, typeof (_q = typeof dto_1.CandidatePayload !== "undefined" && dto_1.CandidatePayload) === "function" ? _q : Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "onIceCandidate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.RECORD_TIME),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_r = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _r : Object, typeof (_s = typeof dto_1.RecordPayload !== "undefined" && dto_1.RecordPayload) === "function" ? _s : Object]),
    __metadata("design:returntype", Promise)
], RoomGateway.prototype, "recordTime", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.VIDEO_STATE_CHANGE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _t : Object, typeof (_u = typeof dto_1.MediaStateChangePayload !== "undefined" && dto_1.MediaStateChangePayload) === "function" ? _u : Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "onVideoStateChange", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(event_enum_1.EVENT.AUDIO_STATE_CHANGE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_v = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _v : Object, typeof (_w = typeof dto_1.MediaStateChangePayload !== "undefined" && dto_1.MediaStateChangePayload) === "function" ? _w : Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "onAudioStateChange", null);
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
/******/ 	__webpack_require__.h = () => ("d449d19cbf39c58e6787")
/******/ })();
/******/ 
/******/ }
;