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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../domain/entity/user.entity");
const typeorm_2 = require("typeorm");
let UserRepository = class UserRepository {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findUser(signname) {
        const user = await this.userRepository.findOne({
            where: { signname, withdraw: 'false' },
        });
        if (!user) {
            throw new common_1.HttpException('not user', 400);
        }
        return user;
    }
    async checkDuplicatedEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email, withdraw: 'false' },
        });
        if (user) {
            throw new common_1.HttpException('duplicate email', 400);
        }
        return true;
    }
    async checkDuplicatedPhone(email) {
        const user = await this.userRepository.findOne({
            where: { email, withdraw: 'false' },
        });
        if (user) {
            throw new common_1.HttpException('duplicate email', 400);
        }
        return true;
    }
    async duplicateUser(signname) {
        const user = await this.userRepository.findOne({
            where: { signname, withdraw: 'false' },
        });
        if (user) {
            throw new common_1.HttpException('duplicate user', 400);
        }
        return user;
    }
    async findUserforEmail(to) {
        const user = await this.userRepository.findOne({
            where: { email: to, withdraw: 'false' },
        });
        if (!user) {
            throw new common_1.HttpException('not user', 400);
        }
        return user;
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map