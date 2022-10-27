"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 83:
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Participant = void 0;
const typeorm_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
const auth_entity_1 = __webpack_require__(26);
const class_transformer_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(22);
let Participant = class Participant {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    (0, typeorm_1.OneToOne)(() => auth_entity_1.Auth, (auth) => auth.user_id),
    __metadata("design:type", Number)
], Participant.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "노는방",
        description: "방이름",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: "varchar", length: 20, comment: "방이름", unique: true }),
    __metadata("design:type", String)
], Participant.prototype, "roomName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "4",
        description: "읽지 않은 채팅 수",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)({
        type: "varchar",
        name: "not_read_chatCount",
    }),
    __metadata("design:type", Number)
], Participant.prototype, "notReadChatCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "dktnqls0624",
        description: "마지막으로 읽은 채팅 아이디",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: "varchar", comment: "마지막으로 읽은 채팅 아이디" }),
    __metadata("design:type", String)
], Participant.prototype, "lastReadChatId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "방식별아이디",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)({
        type: "int",
        name: "room_id",
    }),
    __metadata("design:type", Number)
], Participant.prototype, "roomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "dkltnqls0724",
        description: "유저식별 아이디",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({
        type: "varchar",
        name: "signname",
    }),
    (0, typeorm_1.OneToMany)(() => user_entity_1.Users, (user) => user.signname),
    __metadata("design:type", Array)
], Participant.prototype, "user", void 0);
Participant = __decorate([
    (0, typeorm_1.Index)("id", ["id"], { unique: true }),
    (0, typeorm_1.Entity)({ name: "participant" })
], Participant);
exports.Participant = Participant;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1674414067bc14230591")
/******/ })();
/******/ 
/******/ }
;