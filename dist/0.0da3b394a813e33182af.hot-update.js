"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 76:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(77), exports);
__exportStar(__webpack_require__(78), exports);
__exportStar(__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './chat-message.dto'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())), exports);
__exportStar(__webpack_require__(79), exports);
__exportStar(__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module './candidate.dto'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())), exports);
__exportStar(__webpack_require__(80), exports);
__exportStar(__webpack_require__(81), exports);
__exportStar(__webpack_require__(82), exports);


/***/ }),

/***/ 77:
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
exports.JoinRoomPayload = void 0;
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
let JoinRoomPayload = class JoinRoomPayload {
};
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], JoinRoomPayload.prototype, "room", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], JoinRoomPayload.prototype, "uid", void 0);
JoinRoomPayload = __decorate([
    (0, swagger_1.ApiTags)("socket")
], JoinRoomPayload);
exports.JoinRoomPayload = JoinRoomPayload;


/***/ }),

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KickUserPayload = void 0;
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
let KickUserPayload = class KickUserPayload {
};
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], KickUserPayload.prototype, "room", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], KickUserPayload.prototype, "userToKick", void 0);
KickUserPayload = __decorate([
    (0, swagger_1.ApiTags)("socket")
], KickUserPayload);
exports.KickUserPayload = KickUserPayload;


/***/ }),

/***/ 78:
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
exports.LeaveRoomPayload = void 0;
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
let LeaveRoomPayload = class LeaveRoomPayload {
};
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LeaveRoomPayload.prototype, "room", void 0);
LeaveRoomPayload = __decorate([
    (0, swagger_1.ApiTags)("socket")
], LeaveRoomPayload);
exports.LeaveRoomPayload = LeaveRoomPayload;


/***/ }),

/***/ 81:
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
exports.MediaStateChangePayload = void 0;
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
let MediaStateChangePayload = class MediaStateChangePayload {
};
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MediaStateChangePayload.prototype, "uid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MediaStateChangePayload.prototype, "room", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], MediaStateChangePayload.prototype, "enabled", void 0);
MediaStateChangePayload = __decorate([
    (0, swagger_1.ApiTags)("socket")
], MediaStateChangePayload);
exports.MediaStateChangePayload = MediaStateChangePayload;


/***/ }),

/***/ 79:
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
exports.AnswerOfferPayload = exports.CallOfferPayload = void 0;
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
let CallOfferPayload = class CallOfferPayload {
};
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CallOfferPayload.prototype, "to", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_a = typeof RTCSessionDescriptionInit !== "undefined" && RTCSessionDescriptionInit) === "function" ? _a : Object)
], CallOfferPayload.prototype, "offer", void 0);
CallOfferPayload = __decorate([
    (0, swagger_1.ApiTags)("socket")
], CallOfferPayload);
exports.CallOfferPayload = CallOfferPayload;
let AnswerOfferPayload = class AnswerOfferPayload {
};
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AnswerOfferPayload.prototype, "to", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_b = typeof RTCSessionDescriptionInit !== "undefined" && RTCSessionDescriptionInit) === "function" ? _b : Object)
], AnswerOfferPayload.prototype, "answer", void 0);
AnswerOfferPayload = __decorate([
    (0, swagger_1.ApiTags)("socket")
], AnswerOfferPayload);
exports.AnswerOfferPayload = AnswerOfferPayload;


/***/ }),

/***/ 80:
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
exports.RecordPayload = void 0;
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
let RecordPayload = class RecordPayload {
};
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], RecordPayload.prototype, "time", void 0);
RecordPayload = __decorate([
    (0, swagger_1.ApiTags)("socket")
], RecordPayload);
exports.RecordPayload = RecordPayload;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("97cf8a8add4530c3649f")
/******/ })();
/******/ 
/******/ }
;