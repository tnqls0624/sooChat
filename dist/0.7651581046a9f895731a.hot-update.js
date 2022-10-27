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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageGateway = void 0;
const websockets_1 = __webpack_require__(71);
const common_1 = __webpack_require__(6);
const socket_io_1 = __webpack_require__(72);
const ws_1 = __webpack_require__(73);
let MessageGateway = class MessageGateway {
    constructor() {
        this.logger = new common_1.Logger("MessageGateway");
    }
    afterInit(server) {
        return this.logger.log("Init");
    }
    handleConnection(client) {
        return this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        return this.logger.log(`Client disconnected: ${client.id}`);
    }
    joinRoom(client, room) {
        client.join(room);
        client.emit("joinedRoom", room);
    }
    leaveRoom(client, room) {
        client.leave(room);
        client.emit("leftRoom", room);
    }
    handleMessage(client, payload) {
        return this.server.to(payload.room).emit("msgToClient", payload);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof ws_1.Server !== "undefined" && ws_1.Server) === "function" ? _a : Object)
], MessageGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("joinRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object, String]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "joinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("leaveRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object, String]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "leaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("msgToServer"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], MessageGateway.prototype, "handleMessage", null);
MessageGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: "/chat" })
], MessageGateway);
exports.MessageGateway = MessageGateway;


/***/ }),

/***/ 73:
/***/ ((module) => {

module.exports = require("ws");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("057aad6dde7e45143ec7")
/******/ })();
/******/ 
/******/ }
;