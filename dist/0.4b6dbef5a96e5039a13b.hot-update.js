"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 89:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FriendModule = void 0;
const common_1 = __webpack_require__(6);
const friend_service_1 = __webpack_require__(90);
const friend_controller_1 = __webpack_require__(91);
const friend_repository_1 = __webpack_require__(92);
let FriendModule = class FriendModule {
};
FriendModule = __decorate([
    (0, common_1.Module)({
        controllers: [friend_controller_1.FriendController],
        providers: [friend_service_1.FriendService, friend_repository_1.FriendRepository],
        exports: [friend_service_1.FriendService, friend_repository_1.FriendRepository],
    })
], FriendModule);
exports.FriendModule = FriendModule;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d551b6daa540ac6dd51e")
/******/ })();
/******/ 
/******/ }
;