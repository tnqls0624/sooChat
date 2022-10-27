"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 93:
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
exports.Friend = void 0;
const typeorm_1 = __webpack_require__(23);
const class_validator_1 = __webpack_require__(25);
const class_transformer_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(22);
let Friend = class Friend {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Friend.prototype, "id", void 0);
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
], Friend.prototype, "user_id", void 0);
__decorate([
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        type: "int",
        name: "friend_id",
        comment: "친구 아이디",
    }),
    __metadata("design:type", Number)
], Friend.prototype, "friend_id", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "update_at", comment: "수정일" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Friend.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "create_at", comment: "생성일" }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Friend.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.Users, (user) => user.Friend, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "user_id", referencedColumnName: "id" }]),
    __metadata("design:type", Array)
], Friend.prototype, "User", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.Users, (user) => user.Friend, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)([{ name: "friend_id", referencedColumnName: "id" }]),
    __metadata("design:type", Array)
], Friend.prototype, "Friend", void 0);
Friend = __decorate([
    (0, typeorm_1.Index)("id", ["id"], { unique: true }),
    (0, typeorm_1.Entity)({ name: "friend" })
], Friend);
exports.Friend = Friend;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1eb7a06f0ebe9617d657")
/******/ })();
/******/ 
/******/ }
;