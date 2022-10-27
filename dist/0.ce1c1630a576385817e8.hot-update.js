"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 78:
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
const websockets_1 = __webpack_require__(61);
let RoomGateway = class RoomGateway {
    handleMessage(client, payload) {
        return "Hello world!";
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)({
        namespace: "room",
        cors: {
            origin: true,
            credentials: true,
        },
        transports: ["websocket", "polling"],
        allowEIO3: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], RoomGateway.prototype, "handleMessage", null);
RoomGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], RoomGateway);
exports.RoomGateway = RoomGateway;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("33e5ba1eb3962113360d")
/******/ })();
/******/ 
/******/ }
;