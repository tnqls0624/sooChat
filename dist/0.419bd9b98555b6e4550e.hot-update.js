"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 28:
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Participant = void 0;
const typeorm_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
const class_transformer_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(22);
const room_entity_1 = __webpack_require__(71);
let Participant = class Participant {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Participant.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        type: "int",
        name: "user_id",
        comment: "유저 아이디",
    }),
    __metadata("design:type", Number)
], Participant.prototype, "user_id", void 0);
__decorate([
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)('int', {
        name: "room_id",
        comment: "방 아이디",
        primary: true,
    }),
    __metadata("design:type", Number)
], Participant.prototype, "room_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 4,
        description: "읽지 않은 채팅 수",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsNumber)(),
    (0, typeorm_1.Column)({
        type: "int",
        name: "not_read_chatCount",
        nullable: true,
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
    (0, typeorm_1.Column)({
        type: "varchar",
        name: "last_read_chatId",
        comment: "마지막으로 읽은 채팅 아이디",
        nullable: true,
    }),
    __metadata("design:type", String)
], Participant.prototype, "lastReadChatId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.Users, (user) => user.Participant, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "user_id", referencedColumnName: "id" }]),
    __metadata("design:type", Array)
], Participant.prototype, "User", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => room_entity_1.Room, (room) => room.Participant),
    (0, typeorm_1.JoinColumn)([{ name: "room_id", referencedColumnName: "id" }]),
    __metadata("design:type", typeof (_a = typeof room_entity_1.Room !== "undefined" && room_entity_1.Room) === "function" ? _a : Object)
], Participant.prototype, "Room", void 0);
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
/******/ 	__webpack_require__.h = () => ("9b71b0f988b283047ade")
/******/ })();
/******/ 
/******/ }
;