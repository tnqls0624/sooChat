"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 79:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(15);
const user_entity_1 = __webpack_require__(22);
const room_controller_1 = __webpack_require__(80);
const room_entity_1 = __webpack_require__(82);
const room_repository_1 = __webpack_require__(84);
const room_service_1 = __webpack_require__(81);
let RoomModule = class RoomModule {
};
RoomModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.Users, room_entity_1.Room])],
        controllers: [room_controller_1.RoomController],
        providers: [room_service_1.RoomService, room_repository_1.RoomRepository],
    })
], RoomModule);
exports.RoomModule = RoomModule;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2195e6795205a7dc58ad")
/******/ })();
/******/ 
/******/ }
;