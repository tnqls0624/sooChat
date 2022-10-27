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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../../../user/domain/entity/user.entity");
const swagger_1 = require("@nestjs/swagger");
let Auth = class Auth {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Auth.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'djsabcjxzcoj34258493yfbdjsk',
        description: '재발급 토큰',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Auth.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'create_at', comment: '생성일' }),
    __metadata("design:type", Date)
], Auth.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'update_at', comment: '수정일' }),
    __metadata("design:type", Date)
], Auth.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.Users, (user) => user.id, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'user_id', referencedColumnName: 'id' }]),
    (0, typeorm_1.Column)({
        type: 'varchar',
        name: 'user_id',
        comment: '리프레시 토큰ID',
        unique: true,
    }),
    __metadata("design:type", String)
], Auth.prototype, "user_id", void 0);
Auth = __decorate([
    (0, typeorm_1.Index)('id', ['id'], { unique: true }),
    (0, typeorm_1.Entity)({ name: 'auth' })
], Auth);
exports.Auth = Auth;
//# sourceMappingURL=auth.entity.js.map