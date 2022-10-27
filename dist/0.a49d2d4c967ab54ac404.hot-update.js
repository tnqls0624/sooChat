"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 74:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebsocketValidationPipe = void 0;
const common_1 = __webpack_require__(6);
const websockets_1 = __webpack_require__(71);
let WebsocketValidationPipe = class WebsocketValidationPipe extends common_1.ValidationPipe {
    createExceptionFactory() {
        return (validationErrors = []) => {
            if (this.isDetailedOutputDisabled) {
                return new websockets_1.WsException("Bad request");
            }
            const errors = this.flattenValidationErrors(validationErrors);
            return new websockets_1.WsException(errors);
        };
    }
};
WebsocketValidationPipe = __decorate([
    (0, common_1.Injectable)()
], WebsocketValidationPipe);
exports.WebsocketValidationPipe = WebsocketValidationPipe;


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomGateway = void 0;
const common_1 = __webpack_require__(6);
const websockets_1 = __webpack_require__(71);
const socket_validation_pipe_1 = __webpack_require__(74);
let RoomGateway = class RoomGateway {
    handleMessage(client, payload) {
        console.log(payload);
        return "Hello world!";
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)("message"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], RoomGateway.prototype, "handleMessage", null);
RoomGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: "*" },
        transports: ["websocket", "polling"],
        namespace: "socket/room/",
    }),
    (0, common_1.UsePipes)(new socket_validation_pipe_1.WebsocketValidationPipe())
], RoomGateway);
exports.RoomGateway = RoomGateway;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("258f5ac7cff200b017ae")
/******/ })();
/******/ 
/******/ }
;