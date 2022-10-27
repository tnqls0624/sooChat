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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomGatewayService = void 0;
const common_1 = __webpack_require__(6);
let RoomGatewayService = class RoomGatewayService {
    constructor() {
        this.logger = new common_1.Logger("RoomGateway");
    }
    onAfterInit(server) {
        this.setServer(server);
        this.logger.log("Initialized RoomGateway");
    }
    setServer(server) {
        this.server = server;
    }
    onConnection(client) {
        this.logger.debug(`Client connected, sid: ${client.id}`);
        client.on("disconnecting", (reason) => {
            console.log(reason);
        });
    }
    onDisconnect(client) {
        this.logger.debug(`Client disconnected, sid: ${client.id}`);
    }
};
RoomGatewayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RoomGatewayService);
exports.RoomGatewayService = RoomGatewayService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("fe31750de71b1a125ae5")
/******/ })();
/******/ 
/******/ }
;