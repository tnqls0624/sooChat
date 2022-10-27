"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 21:
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(15);
const user_entity_1 = __webpack_require__(22);
const typeorm_2 = __webpack_require__(23);
let UserRepository = class UserRepository {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findUser(signname) {
        const user = await this.userRepository.findOne({
            where: { signname, withdraw: "false" },
        });
        if (!user) {
            throw new common_1.HttpException("not user", 400);
        }
        return user;
    }
    async findId(id) {
        const user = await this.userRepository.findOne({
            where: { id, withdraw: "false" },
        });
        if (!user) {
            throw new common_1.HttpException("not user", 400);
        }
        return user;
    }
    async checkDuplicatedEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email, withdraw: "false" },
        });
        if (user) {
            throw new common_1.HttpException("duplicate email", 400);
        }
        return true;
    }
    async checkDuplicatedPhone(email) {
        const user = await this.userRepository.findOne({
            where: { email, withdraw: "false" },
        });
        if (user) {
            throw new common_1.HttpException("duplicate email", 400);
        }
        return true;
    }
    async duplicateUser(signname) {
        const user = await this.userRepository.findOne({
            where: { signname, withdraw: "false" },
        });
        if (user) {
            throw new common_1.HttpException("duplicate user", 400);
        }
        return user;
    }
    async findUserforEmail(to) {
        const user = await this.userRepository.findOne({
            where: { email: to, withdraw: "false" },
        });
        if (!user) {
            throw new common_1.HttpException("not user", 400);
        }
        return user;
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UserRepository);
exports.UserRepository = UserRepository;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e5b8b0667274964261e9")
/******/ })();
/******/ 
/******/ }
;