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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventsGateway = void 0;
const websockets_1 = __webpack_require__(71);
const socket_io_1 = __webpack_require__(72);
let EventsGateway = class EventsGateway {
    handleMessage(client, data) {
        const event = "events";
        return { event, data };
    }
    afterInit(server) {
        console.log('ws init!');
    }
    handleConnection(socket) {
        console.log('conneted', socket.nsp.name);
        if (!onlineMap[socket.nsp.name]) {
            onlineMap[socket.nsp.name] = {};
        }
        socket.emit('hello', socket.nsp.name);
    }
    handleDisconnect(socket) {
        console.log('disconnected', socket.nsp.name);
        const newNamespace = socket.nsp;
        delete onlineMap[socket.nsp.name][socket.id];
        newNamespace.emit('onlineList', Object.values(onlineMap[socket.nsp.name]));
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], EventsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("message"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", typeof (_c = typeof websockets_1.WsResponse !== "undefined" && websockets_1.WsResponse) === "function" ? _c : Object)
], EventsGateway.prototype, "handleMessage", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleConnection", null);
__decorate([
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleDisconnect", null);
EventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3001, { namespace: /\/ws-.+/ })
], EventsGateway);
exports.EventsGateway = EventsGateway;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("c3f90b137b44fecab1da")
/******/ })();
/******/ 
/******/ }
;