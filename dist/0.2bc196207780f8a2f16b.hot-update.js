"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 92:
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
exports.FriendRepository = void 0;
const common_1 = __webpack_require__(6);
const user_service_1 = __webpack_require__(59);
const typeorm_1 = __webpack_require__(23);
let FriendRepository = class FriendRepository {
    constructor(connection, userService) {
        this.connection = connection;
        this.userService = userService;
    }
    async addFriend(param, user) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.commitTransaction();
            return;
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
    }
};
FriendRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Connection !== "undefined" && typeorm_1.Connection) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object])
], FriendRepository);
exports.FriendRepository = FriendRepository;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1fc6c1e22d7160830552")
/******/ })();
/******/ 
/******/ }
;