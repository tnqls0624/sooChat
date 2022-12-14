exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 93:
/***/ (() => {

throw new Error("Module parse failed: Unexpected token (55:71)\nFile was processed with these loaders:\n * ./node_modules/ts-loader/index.js\nYou may need an additional loader to handle the result of these loaders.\n| ], Friend.prototype, \"created_at\", void 0);\n| __decorate([\n>     (0, typeorm_1.OneToMany)(() => user_entity_1.Users, (user) => user., {\n|         onUpdate: \"CASCADE\",\n|         onDelete: \"CASCADE\",");

/***/ }),

/***/ 22:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Users = exports.UserTypeEnum = void 0;
const typeorm_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
const auth_entity_1 = __webpack_require__(26);
const class_transformer_1 = __webpack_require__(27);
const participant_eneity_1 = __webpack_require__(28);
const friend_eneity_1 = __webpack_require__(93);
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
        description: "?????????",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsEnum)(UserTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        type: "varchar",
        comment: "????????? ??????(SIGNNAME/KAKAO/GOOGLE/APPLE)",
    }),
    __metadata("design:type", String)
], Users.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "dktnqls0624",
        description: "?????????",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[A-Za-z0-9]+$/, {
        message: "??????, ???(???, ???)????????? ????????? ??? ????????????!",
    }),
    (0, typeorm_1.Column)({ type: "varchar", length: 20, comment: "?????? ?????????", unique: true }),
    __metadata("design:type", String)
], Users.prototype, "signname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "test1234!",
        description: "????????????",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(15),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[A-Za-z\d$!@#$%^&*?&]{8,15}$/, {
        message: "???(???, ???)??????, ????????????($!@#$%^&*?&)??? ????????? ????????????, 8~15?????? ????????? ?????? ??? ?????????!",
    }),
    (0, typeorm_1.Column)({ type: "varchar", comment: "?????? ????????????" }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "?????????",
        description: "??????",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(15),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[0-9A-Za-z???-??????-???-???-???]+$/, {
        message: "??????,???(???, ???)??????, ????????? ?????? ?????? ?????????!",
    }),
    (0, typeorm_1.Column)({ type: "varchar", length: 15, comment: "?????? ??????" }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "dktnqls0624@itechcompany.kr",
        description: "?????????",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[0-9A-Za-z]+@[0-9A-Za-z]+\.([a-z]+)*$/, {
        message: "????????? ????????? ?????? ?????? ??? ?????????!",
    }),
    (0, typeorm_1.Column)("varchar", {
        name: "email",
        unique: true,
        comment: "?????? ?????????",
    }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "01011112222",
        description: "???????????????",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^01(?:0|1|[6-9])?(\d{3}|\d{4})?(\d{4})$/, {
        message: "????????? ????????? ????????? ?????? ??????????????????!",
    }),
    (0, typeorm_1.Column)("varchar", {
        name: "phone",
        unique: true,
        comment: "?????? ????????????",
    }),
    __metadata("design:type", String)
], Users.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)("varchar", {
        name: "varifymail",
        comment: "????????? ?????? ??????",
    }),
    __metadata("design:type", String)
], Users.prototype, "varifymail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)("varchar", {
        name: "withdraw",
        comment: "?????? ??????",
    }),
    __metadata("design:type", String)
], Users.prototype, "withdraw", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "create_at", comment: "?????????" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Users.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "update_at", comment: "?????????" }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Users.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: "withdraw_at", comment: "?????????" }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Users.prototype, "withdraw_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => participant_eneity_1.Participant, (participant) => participant.User),
    __metadata("design:type", typeof (_d = typeof participant_eneity_1.Participant !== "undefined" && participant_eneity_1.Participant) === "function" ? _d : Object)
], Users.prototype, "Participant", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => auth_entity_1.Auth, (auth) => auth.User),
    __metadata("design:type", typeof (_e = typeof auth_entity_1.Auth !== "undefined" && auth_entity_1.Auth) === "function" ? _e : Object)
], Users.prototype, "Auth", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => friend_eneity_1.Friend, (friend) => friend.User),
    __metadata("design:type", typeof (_f = typeof friend_eneity_1.Friend !== "undefined" && friend_eneity_1.Friend) === "function" ? _f : Object)
], Users.prototype, "Friend", void 0);
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
/******/ 	__webpack_require__.h = () => ("44df538ca5c6ce2a7126")
/******/ })();
/******/ 
/******/ }
;