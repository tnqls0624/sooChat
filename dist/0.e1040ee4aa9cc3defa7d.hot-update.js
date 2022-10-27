"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 90:
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
exports.FriendService = void 0;
const common_1 = __webpack_require__(6);
const friend_repository_1 = __webpack_require__(92);
let FriendService = class FriendService {
    constructor(friendRepository) {
        this.friendRepository = friendRepository;
    }
    async addFriend(id, user) {
        return await this.friendRepository.addFriend(id, user);
    }
};
FriendService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof friend_repository_1.FriendRepository !== "undefined" && friend_repository_1.FriendRepository) === "function" ? _a : Object])
], FriendService);
exports.FriendService = FriendService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e98428da8fa7b3c04fca")
/******/ })();
/******/ 
/******/ }
;