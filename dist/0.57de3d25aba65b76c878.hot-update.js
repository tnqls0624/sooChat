"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 22:
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
exports.Users = exports.UserTypeEnum = void 0;
const typeorm_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
const auth_entity_1 = __webpack_require__(26);
const class_transformer_1 = __webpack_require__(27);
var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum["KAKAO"] = "KAKAO";
    UserTypeEnum["GOOGLE"] = "GOOGLE";
    UserTypeEnum["NAVER"] = "NAVER";
    UserTypeEnum["SIGNNAME"] = "SIGNNAME";
})(UserTypeEnum = exports.UserTypeEnum || (exports.UserTypeEnum = {}));
let Users = class Users {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "SIGNNAME",
        description: "메소드",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsEnum)(UserTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        type: "varchar",
        comment: "로그인 방식(SIGNNAME/KAKAO/GOOGLE/APPLE)",
    }),
    __metadata("design:type", String)
], Users.prototype, "method", void 0);
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
    (0, typeorm_1.OneToOne)(() => auth_entity_1.Auth, (auth) => auth.signname),
    (0, typeorm_1.Column)({ type: "varchar", length: 20, comment: "유저 아이디", unique: true }),
    __metadata("design:type", String)
], Users.prototype, "signname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "수무무",
        description: "닉네임",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(20),
    (0, typeorm_1.Column)({ type: "varchar", length: 20, comment: "닉네임" }),
    __metadata("design:type", String)
], Users.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "test1234!",
        description: "비밀번호",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(15),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[A-Za-z\d$!@#$%^&*?&]{8,15}$/, {
        message: "영(소, 대)문자, 특수문자($!@#$%^&*?&)만 입력이 가능하고, 8~15글자 이내에 입력 해 주세요!",
    }),
    (0, typeorm_1.Column)({ type: "varchar", comment: "유저 비밀번호" }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "이수빈",
        description: "이름",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(15),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[0-9A-Za-zㄱ-ㅎㅏ-ㅣ-가-힣]+$/, {
        message: "숫자,영(소, 대)문자, 한글만 입력 가능 합니다!",
    }),
    (0, typeorm_1.Column)({ type: "varchar", length: 15, comment: "유저 이름" }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "dktnqls0624@itechcompany.kr",
        description: "이메일",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[0-9A-Za-z]+@[0-9A-Za-z]+\.([a-z]+)*$/, {
        message: "이메일 형식에 맞게 입력 해 주세요!",
    }),
    (0, typeorm_1.Column)("varchar", {
        name: "email",
        unique: true,
        comment: "유저 이메일",
    }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "01011112222",
        description: "핸드폰번호",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^01(?:0|1|[6-9])?(\d{3}|\d{4})?(\d{4})$/, {
        message: "핸드폰 번호의 형식에 맞게 입력해주세요!",
    }),
    (0, typeorm_1.Column)("varchar", {
        name: "phone",
        unique: true,
        comment: "유저 전화번호",
    }),
    __metadata("design:type", String)
], Users.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "수무무",
        description: "닉네임",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: "varchar", comment: "프로필 이미지" }),
    __metadata("design:type", String)
], Users.prototype, "profilImgUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "수무무",
        description: "닉네임",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: "varchar", comment: "닉네임" }),
    __metadata("design:type", String)
], Users.prototype, "backgroundImgUrl", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)("varchar", {
        name: "varifymail",
        comment: "이메일 인증 여부",
    }),
    __metadata("design:type", String)
], Users.prototype, "varifymail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)("varchar", {
        name: "withdraw",
        comment: "탈퇴 여부",
    }),
    __metadata("design:type", String)
], Users.prototype, "withdraw", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "create_at", comment: "생성일" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Users.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "update_at", comment: "수정일" }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Users.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "withdraw_at", comment: "탈퇴일" }),
    __metadata("design:type", String)
], Users.prototype, "withdraw_at", void 0);
Users = __decorate([
    (0, typeorm_1.Index)("id", ["id"], { unique: true }),
    (0, typeorm_1.Entity)({ name: "user" })
], Users);
exports.Users = Users;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("99ae3ffc491072e292b8")
/******/ })();
/******/ 
/******/ }
;