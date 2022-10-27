"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 53:
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
exports.UserService = void 0;
const common_1 = __webpack_require__(6);
const user_repository_1 = __webpack_require__(21);
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    findUser(signname) {
        return this.userRepository.findUser(signname);
    }
    findId(id) {
        return this.userRepository.findId(id);
    }
    async checkDuplicatedSignname(signname) {
        await this.userRepository.duplicateUser(signname);
        return true;
    }
    async checkDuplicatedEmail(email) {
        return await this.userRepository.checkDuplicatedEmail(email);
    }
    async checkDuplicatedPhone(phone) {
        return await this.userRepository.checkDuplicatedPhone(phone);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _a : Object])
], UserService);
exports.UserService = UserService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("4e3c4b8c1af651ec5307")
/******/ })();
/******/ 
/******/ }
;