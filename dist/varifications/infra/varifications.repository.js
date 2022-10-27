"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarificationsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../user/domain/entity/user.entity");
const user_repository_1 = require("../../user/infra/user.repository");
const typeorm_2 = require("typeorm");
const varifications_entity_1 = require("../domain/entity/varifications.entity");
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
            await this.userRepository.findUser(args.signname);
            await queryRunner.manager.save(varifications_entity_1.Varification, args);
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
                varifymail: 'true',
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
            throw new common_1.HttpException('invalid token', 400);
        return verification;
    }
    async varifyMailKey(key, signname) {
        const verification = await this.varifyRepository.findOne({
            where: { type: varifications_entity_1.VerificationTypeEnum.PASSWORD, key, signname },
        });
        if (!verification)
            throw new common_1.HttpException('not key', 400);
        return verification;
    }
};
VarificationsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(varifications_entity_1.Varification)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        typeorm_2.Connection,
        typeorm_2.Repository])
], VarificationsRepository);
exports.VarificationsRepository = VarificationsRepository;
//# sourceMappingURL=varifications.repository.js.map