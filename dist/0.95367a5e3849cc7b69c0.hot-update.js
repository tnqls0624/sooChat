"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 84:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CHAT_MESSAGE_TYPE = void 0;
exports.CHAT_MESSAGE_TYPE = {
    MESSAGE: "MESSAGE",
    CODE: "CODE",
};


/***/ }),

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatMessagePayload = void 0;
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
const message_type_enum_1 = __webpack_require__(84);
let ChatMessagePayload = class ChatMessagePayload {
};
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChatMessagePayload.prototype, "room", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(message_type_enum_1.CHAT_MESSAGE_TYPE),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_a = typeof message_type_enum_1.CHAT_MESSAGE_TYPE !== "undefined" && message_type_enum_1.CHAT_MESSAGE_TYPE) === "function" ? _a : Object)
], ChatMessagePayload.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ChatMessagePayload.prototype, "sender", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChatMessagePayload.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChatMessagePayload.prototype, "createdAt", void 0);
ChatMessagePayload = __decorate([
    (0, swagger_1.ApiTags)("socket")
], ChatMessagePayload);
exports.ChatMessagePayload = ChatMessagePayload;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b950f675275cb5068cf3")
/******/ })();
/******/ 
/******/ }
;