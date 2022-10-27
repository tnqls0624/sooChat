"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 82:
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
exports.Room = exports.RoomTypeEnum = void 0;
const typeorm_1 = __webpack_require__(23);
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
const auth_entity_1 = __webpack_require__(26);
const class_transformer_1 = __webpack_require__(27);
var RoomTypeEnum;
(function (RoomTypeEnum) {
    RoomTypeEnum["INDIVIDUAL"] = "INDIVIDUAL";
    RoomTypeEnum["GROUP"] = "GROUP";
})(RoomTypeEnum = exports.RoomTypeEnum || (exports.RoomTypeEnum = {}));
let Room = class Room {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    (0, typeorm_1.OneToOne)(() => auth_entity_1.Auth, (auth) => auth.user_id),
    __metadata("design:type", Number)
], Room.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "이수빈방",
        description: "방이름",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ type: "varchar", comment: "방이름" }),
    __metadata("design:type", String)
], Room.prototype, "roomName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "방장아이디",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        type: "int",
        comment: "방장아이디",
    }),
    __metadata("design:type", Number)
], Room.prototype, "room_master_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "INDIVIDUAL",
        description: "방타입",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsEnum)(RoomTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({
        type: "varchar",
        comment: "방타입(INDIVIDUAL/GROUP)",
    }),
    __metadata("design:type", String)
], Room.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "동해물과 백두산이",
        description: "마지막 내용",
    }),
    (0, class_transformer_1.Transform)((params) => params.value.trim()),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)({ type: "varchar", comment: "마지막 내용" }),
    __metadata("design:type", String)
], Room.prototype, "lastChat", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "create_at", comment: "생성일" }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Room.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "update_at", comment: "수정일" }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Room.prototype, "updated_at", void 0);
Room = __decorate([
    (0, typeorm_1.Index)("id", ["id"], { unique: true }),
    (0, typeorm_1.Entity)({ name: "room" })
], Room);
exports.Room = Room;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("79c4eabbd788282cea6d")
/******/ })();
/******/ 
/******/ }
;