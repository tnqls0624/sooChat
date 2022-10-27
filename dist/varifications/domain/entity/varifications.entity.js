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
exports.Varification = exports.VerificationTypeEnum = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var VerificationTypeEnum;
(function (VerificationTypeEnum) {
    VerificationTypeEnum["MAIL"] = "MAIL";
    VerificationTypeEnum["SIGNNAME"] = "SIGNNAME";
    VerificationTypeEnum["PASSWORD"] = "PASSWORD";
})(VerificationTypeEnum = exports.VerificationTypeEnum || (exports.VerificationTypeEnum = {}));
let Varification = class Varification {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Varification.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'PASSWORD',
        description: '타입',
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsEnum)(VerificationTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, comment: '타입' }),
    __metadata("design:type", String)
], Varification.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'dktnqls0624@itechcompany.kr',
        description: '받는 이메일 주소',
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: 'varchar', comment: '보낼 주소' }),
    __metadata("design:type", String)
], Varification.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'vbdfibi',
        description: '토큰',
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, comment: '토큰' }),
    __metadata("design:type", String)
], Varification.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123456',
        description: '키값',
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, comment: '키값' }),
    __metadata("design:type", String)
], Varification.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'dktnqls0624',
        description: '아이디',
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[A-Za-z0-9]+$/, {
        message: '숫자, 영(소, 대)문자만 입력할 수 있습니다!',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, comment: '유저 아이디' }),
    __metadata("design:type", String)
], Varification.prototype, "signname", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'create_at', comment: '생성일' }),
    __metadata("design:type", Date)
], Varification.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'update_at', comment: '수정일' }),
    __metadata("design:type", Date)
], Varification.prototype, "updated_at", void 0);
Varification = __decorate([
    (0, typeorm_1.Index)('id', ['id'], { unique: true }),
    (0, typeorm_1.Entity)({ name: 'varification' })
], Varification);
exports.Varification = Varification;
//# sourceMappingURL=varifications.entity.js.map