"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 32:
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VarificationsRepository = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(15);
const user_entity_1 = __webpack_require__(22);
const user_repository_1 = __webpack_require__(21);
const typeorm_2 = __webpack_require__(23);
const varifications_entity_1 = __webpack_require__(33);
let VarificationsRepository = class VarificationsRepository {
    constructor(userRepository, connection, varifyRepository) {
        this.userRepository = userRepository;
        this.connection = connection;
        this.varifyRepository = varifyRepository;
    }
    async requestMail(args) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await this.userRepository.findUserId(args.user_id);
            await queryRunner.manager.upsert(varifications_entity_1.Varification, [args], ["user_id"]);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
        return args.token;
    }
    async varifyMail(body) {
        const { token, key } = body;
        const varification = await this.varifyMailTokenAndKey(token, key);
        await this.updateVarify(varification);
        await this.removeVarify(varification);
        return true;
    }
    async removeVarify(varification) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.remove(varifications_entity_1.Varification, varification);
            await queryRunner.commitTransaction();
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
    async updateVarify(verification) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.update(user_entity_1.Users, {
                signname: verification.signname,
            }, {
                varifymail: "true",
            });
            await queryRunner.commitTransaction();
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
    async varifyMailTokenAndKey(token, key) {
        const verification = await this.varifyRepository.findOne({
            where: { token, key },
        });
        if (!verification)
            throw new common_1.HttpException("invalid token", 400);
        return verification;
    }
    async varifyMailKey(key, signname) {
        const verification = await this.varifyRepository.findOne({
            where: { type: varifications_entity_1.VerificationTypeEnum.PASSWORD, key, signname },
        });
        if (!verification)
            throw new common_1.HttpException("not key", 400);
        return verification;
    }
};
VarificationsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(varifications_entity_1.Varification)),
    __metadata("design:paramtypes", [typeof (_a = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Connection !== "undefined" && typeorm_2.Connection) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], VarificationsRepository);
exports.VarificationsRepository = VarificationsRepository;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("5e428c6941cd2af753f5")
/******/ })();
/******/ 
/******/ }
;