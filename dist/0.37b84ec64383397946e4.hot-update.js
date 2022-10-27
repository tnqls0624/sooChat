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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomGatewayService = void 0;
const common_1 = __webpack_require__(6);
let RoomGatewayService = class RoomGatewayService {
    constructor(roomsService, usersService) {
        this.roomsService = roomsService;
        this.usersService = usersService;
        this.logger = new common_1.Logger("RoomGateway");
    }
    onAfterInit(server) {
        this.setServer(server);
        this.logger.log("Initialized RoomGateway");
    }
    setServer(server) {
        this.server = server;
    }
};
RoomGatewayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof RoomsService !== "undefined" && RoomsService) === "function" ? _a : Object, typeof (_b = typeof UsersService !== "undefined" && UsersService) === "function" ? _b : Object])
], RoomGatewayService);
exports.RoomGatewayService = RoomGatewayService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("4027a371c8547c4df7b0")
/******/ })();
/******/ 
/******/ }
;