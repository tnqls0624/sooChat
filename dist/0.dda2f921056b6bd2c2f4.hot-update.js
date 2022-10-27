"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 31:
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthRepository = void 0;
const common_1 = __webpack_require__(6);
const moment_1 = __importDefault(__webpack_require__(14));
const user_entity_1 = __webpack_require__(22);
const user_repository_1 = __webpack_require__(21);
const typeorm_1 = __webpack_require__(23);
const auth_entity_1 = __webpack_require__(26);
const varifications_repository_1 = __webpack_require__(32);
const bcrypt_1 = __webpack_require__(19);
let AuthRepository = class AuthRepository {
    constructor(connection, userRepository, varifyRepository) {
        this.connection = connection;
        this.userRepository = userRepository;
        this.varifyRepository = varifyRepository;
    }
    async createUser(args) {
        const { signname } = args;
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        await this.userRepository.duplicateUser(signname);
        try {
            const user = await queryRunner.manager.save(user_entity_1.Users, args);
            const { password } = user, userWithoutPassword = __rest(user, ["password"]);
            await queryRunner.commitTransaction();
            return userWithoutPassword;
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
    async loginUser(refreshToken, signname) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await this.userRepository.findUser(signname);
            await queryRunner.manager.upsert(auth_entity_1.Auth, [{ user_id: String(user.id), refreshToken }], ["id"]);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
        return true;
    }
    async updateUser(signname, body) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.userRepository.findUser(signname);
            await queryRunner.manager.update(user_entity_1.Users, { signname }, body);
            await queryRunner.commitTransaction();
            return true;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
    }
    async changePassword(user, body) {
        try {
            console.log(user);
            const newPassword = await (0, bcrypt_1.hash)(body.password, 12);
            user.password = newPassword;
            this.updateUser(user.signname, user);
            return true;
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    async findPasswordChange(key, body) {
        try {
            const varification = await this.varifyRepository.varifyMailKey(key, body.signname);
            const user = await this.userRepository.findUser(varification.signname);
            const newPassword = await (0, bcrypt_1.hash)(body.password, 12);
            user.password = newPassword;
            this.updateUser(user.signname, user);
            this.varifyRepository.removeVarify(varification);
            return true;
        }
        catch (error) {
            throw new common_1.HttpException(error, 500);
        }
    }
    async deleteUser(user) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.userRepository.findUser(user.signname);
            await queryRunner.manager.update(user_entity_1.Users, { signname: user.signname }, {
                withdraw: "true",
                withdraw_at: (0, moment_1.default)().format("YYYY-MM-DD HH:mm:ss"),
            });
            await queryRunner.commitTransaction();
            return true;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
    }
};
AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Connection !== "undefined" && typeorm_1.Connection) === "function" ? _a : Object, typeof (_b = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _b : Object, typeof (_c = typeof varifications_repository_1.VarificationsRepository !== "undefined" && varifications_repository_1.VarificationsRepository) === "function" ? _c : Object])
], AuthRepository);
exports.AuthRepository = AuthRepository;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9cd1061fe47e1d12dcc6")
/******/ })();
/******/ 
/******/ }
;