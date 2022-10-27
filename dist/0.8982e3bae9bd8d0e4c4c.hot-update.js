"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 85:
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
exports.CandidatePayload = void 0;
const swagger_1 = __webpack_require__(24);
const class_validator_1 = __webpack_require__(25);
let CandidatePayload = class CandidatePayload {
};
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CandidatePayload.prototype, "to", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_a = typeof RTCIceCandidateInit !== "undefined" && RTCIceCandidateInit) === "function" ? _a : Object)
], CandidatePayload.prototype, "candidate", void 0);
CandidatePayload = __decorate([
    (0, swagger_1.ApiTags)("socket")
], CandidatePayload);
exports.CandidatePayload = CandidatePayload;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("6ab1ad900a5762b4b6e5")
/******/ })();
/******/ 
/******/ }
;