"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 33:
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Varification = exports.VerificationTypeEnum = void 0;
const typeorm_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
const class_transformer_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(22);
var VerificationTypeEnum;
(function (VerificationTypeEnum) {
    VerificationTypeEnum["MAIL"] = "MAIL";
    VerificationTypeEnum["SIGNNAME"] = "SIGNNAME";
    VerificationTypeEnum["PASSWORD"] = "PASSWORD";
})(VerificationTypeEnum = exports.VerificationTypeEnum || (exports.VerificationTypeEnum = {}));
let Varification = class Varification {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Varification.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "PASSWORD",
        description: "타입",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsEnum)(VerificationTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 10, comment: "타입" }),
    __metadata("design:type", String)
], Varification.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "dktnqls0624@itechcompany.kr",
        description: "받는 이메일 주소",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: "varchar", comment: "보낼 주소" }),
    __metadata("design:type", String)
], Varification.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "vbdfibi",
        description: "토큰",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 20, comment: "토큰" }),
    __metadata("design:type", String)
], Varification.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "123456",
        description: "키값",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 10, comment: "키값" }),
    __metadata("design:type", String)
], Varification.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "dktnqls0624",
        description: "아이디",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[A-Za-z0-9]+$/, {
        message: "숫자, 영(소, 대)문자만 입력할 수 있습니다!",
    }),
    (0, typeorm_1.Column)({ type: "varchar", length: 20, comment: "유저 아이디" }),
    __metadata("design:type", String)
], Varification.prototype, "signname", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "create_at", comment: "생성일" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Varification.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "update_at", comment: "수정일" }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Varification.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.Users, (user) => user.id, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "signname", referencedColumnName: "id" }]),
    __metadata("design:type", typeof (_c = typeof user_entity_1.Users !== "undefined" && user_entity_1.Users) === "function" ? _c : Object)
], Varification.prototype, "User", void 0);
Varification = __decorate([
    (0, typeorm_1.Index)("id", ["id"], { unique: true }),
    (0, typeorm_1.Entity)({ name: "varification" })
], Varification);
exports.Varification = Varification;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("01d920b36c1bc151752e")
/******/ })();
/******/ 
/******/ }
;