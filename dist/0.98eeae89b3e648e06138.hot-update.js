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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewaysModule = void 0;
const common_1 = __webpack_require__(6);
const room_gateway_gateway_1 = __webpack_require__(70);
let GatewaysModule = class GatewaysModule {
};
GatewaysModule = __decorate([
    (0, common_1.Module)({
        providers: [room_gateway_gateway_1.RoomGatewayGateway]
    })
], GatewaysModule);
exports.GatewaysModule = GatewaysModule;


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
exports.RoomGatewayGateway = void 0;
const websockets_1 = __webpack_require__(71);
let RoomGatewayGateway = class RoomGatewayGateway {
    handleMessage(client, payload) {
        return 'Hello world!';
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], RoomGatewayGateway.prototype, "handleMessage", null);
RoomGatewayGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], RoomGatewayGateway);
exports.RoomGatewayGateway = RoomGatewayGateway;


/***/ }),

/***/ 71:
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("c31828265bacbd2f0391")
/******/ })();
/******/ 
/******/ }
;