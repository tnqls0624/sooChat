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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventsGateway = void 0;
const websockets_1 = __webpack_require__(71);
const socket_io_1 = __webpack_require__(72);
let EventsGateway = class EventsGateway {
    handleEvent(data, client) {
        const event = "events";
        return { event, data };
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)("events"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _a : Object]),
    __metadata("design:returntype", typeof (_b = typeof websockets_1.WsResponse !== "undefined" && websockets_1.WsResponse) === "function" ? _b : Object)
], EventsGateway.prototype, "handleEvent", null);
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
/******/ 	__webpack_require__.h = () => ("255beb4bb2ecb651914c")
/******/ })();
/******/ 
/******/ }
;