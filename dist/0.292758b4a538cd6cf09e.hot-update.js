"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 91:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FriendController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(24);
const undefinedToNull_interceptor_1 = __webpack_require__(40);
let FriendController = class FriendController {
};
FriendController = __decorate([
    (0, swagger_1.ApiTags)("FRIEND"),
    (0, common_1.UseInterceptors)(undefinedToNull_interceptor_1.UndefinedToNullInterceptor),
    (0, common_1.Controller)("friend")
], FriendController);
exports.FriendController = FriendController;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("4744e14b9de9fe9e6f4f")
/******/ })();
/******/ 
/******/ }
;