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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Chat = void 0;
const typeorm_1 = __webpack_require__(23);
const class_validator_1 = __webpack_require__(25);
const user_entity_1 = __webpack_require__(22);
const room_entity_1 = __webpack_require__(76);
let Chat = class Chat {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Chat.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: "varchar", comment: "메세지" }),
    __metadata("design:type", String)
], Chat.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: "int", comment: "안읽은 사람 수" }),
    __metadata("design:type", Number)
], Chat.prototype, "notRead", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "create_at", comment: "생성일" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Chat.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "update_at", comment: "수정일" }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Chat.prototype, "updated_at", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.Users, (user) => user.signname),
    (0, typeorm_1.Column)({ type: "varchar", length: 20, comment: "유저 아이디", unique: true }),
    __metadata("design:type", typeof (_c = typeof user_entity_1.Users !== "undefined" && user_entity_1.Users) === "function" ? _c : Object)
], Chat.prototype, "signname", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.ManyToOne)(() => room_entity_1.Room, (room) => room.id),
    (0, typeorm_1.Column)({ type: "number", comment: "방 아이디" }),
    __metadata("design:type", typeof (_d = typeof room_entity_1.Room !== "undefined" && room_entity_1.Room) === "function" ? _d : Object)
], Chat.prototype, "roomId", void 0);
Chat = __decorate([
    (0, typeorm_1.Index)("id", ["id"], { unique: true }),
    (0, typeorm_1.Entity)({ name: "chat" })
], Chat);
exports.Chat = Chat;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e3335f30008094105dac")
/******/ })();
/******/ 
/******/ }
;