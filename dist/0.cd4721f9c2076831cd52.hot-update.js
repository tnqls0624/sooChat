"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 81:
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomService = void 0;
const common_1 = __webpack_require__(6);
const room_repository_1 = __webpack_require__(84);
let RoomService = class RoomService {
    constructor(RoomRepositry) {
        this.RoomRepositry = RoomRepositry;
    }
    createRoom(type, user, body) {
        const args = Object.assign(Object.assign({ type }, body), { room_master_id: user.id });
        console.log(args);
        this.RoomRepositry.createRoom(args);
    }
};
RoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof room_repository_1.RoomRepository !== "undefined" && room_repository_1.RoomRepository) === "function" ? _a : Object])
], RoomService);
exports.RoomService = RoomService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("0689e9a78b5561a88704")
/******/ })();
/******/ 
/******/ }
;