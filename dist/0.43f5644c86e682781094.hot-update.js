"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 85:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRoomDto = void 0;
const swagger_1 = __webpack_require__(24);
const room_entity_1 = __webpack_require__(82);
class CreateRoomDto extends (0, swagger_1.PickType)(room_entity_1.Room, [
    "roomMasterId",
    "roomName",
]) {
}
exports.CreateRoomDto = CreateRoomDto;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("c85fce6967b3bdeaa929")
/******/ })();
/******/ 
/******/ }
;