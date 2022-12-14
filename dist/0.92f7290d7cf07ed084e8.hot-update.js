"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 56:
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VarificationsController = void 0;
const common_1 = __webpack_require__(6);
const swagger_1 = __webpack_require__(24);
const response_dto_1 = __webpack_require__(40);
const undefinedToNull_interceptor_1 = __webpack_require__(41);
const requestMail_dto_1 = __webpack_require__(50);
const varifications_entity_1 = __webpack_require__(32);
const varifyMail_dto_1 = __webpack_require__(57);
const varifications_service_1 = __webpack_require__(33);
let VarificationsController = class VarificationsController {
    constructor(varificationsService) {
        this.varificationsService = varificationsService;
    }
    requestMail(type, body) {
        return this.varificationsService.requestMail(type, body);
    }
    varifyMail(body) {
        return this.varificationsService.varifyMail(body);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "??????",
    }),
    (0, swagger_1.ApiOperation)({ summary: "?????? ??????" }),
    (0, swagger_1.ApiQuery)({
        name: "type",
        required: true,
        description: "??????",
        enum: varifications_entity_1.VerificationTypeEnum,
    }),
    (0, common_1.Post)("/requestMail"),
    __param(0, (0, common_1.Query)("type")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof varifications_entity_1.VerificationTypeEnum !== "undefined" && varifications_entity_1.VerificationTypeEnum) === "function" ? _b : Object, typeof (_c = typeof requestMail_dto_1.RequestMailDto !== "undefined" && requestMail_dto_1.RequestMailDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], VarificationsController.prototype, "requestMail", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        type: response_dto_1.ResponseDto,
        description: "??????",
    }),
    (0, swagger_1.ApiOperation)({ summary: "?????? ??????" }),
    (0, common_1.Post)("/varifyMail"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof varifyMail_dto_1.VarifyMailDto !== "undefined" && varifyMail_dto_1.VarifyMailDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], VarificationsController.prototype, "varifyMail", null);
VarificationsController = __decorate([
    (0, swagger_1.ApiTags)("VARIFICATIONS"),
    (0, common_1.UseInterceptors)(undefinedToNull_interceptor_1.UndefinedToNullInterceptor),
    (0, common_1.Controller)("varifications"),
    __metadata("design:paramtypes", [typeof (_a = typeof varifications_service_1.VarificationsService !== "undefined" && varifications_service_1.VarificationsService) === "function" ? _a : Object])
], VarificationsController);
exports.VarificationsController = VarificationsController;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("02e717e6d20e4e0d754a")
/******/ })();
/******/ 
/******/ }
;