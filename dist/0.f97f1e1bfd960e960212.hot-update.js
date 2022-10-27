"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 57:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VarificationsModule = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(15);
const auth_module_1 = __webpack_require__(16);
const auth_entity_1 = __webpack_require__(26);
const auth_repository_1 = __webpack_require__(32);
const user_entity_1 = __webpack_require__(22);
const user_module_1 = __webpack_require__(53);
const varifications_controller_1 = __webpack_require__(58);
const varifications_entity_1 = __webpack_require__(34);
const varifications_repository_1 = __webpack_require__(33);
const varifications_service_1 = __webpack_require__(35);
let VarificationsModule = class VarificationsModule {
};
VarificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.Users, auth_entity_1.Auth, varifications_entity_1.Varification]),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
        ],
        controllers: [varifications_controller_1.VarificationsController],
        providers: [
            varifications_service_1.VarificationsService,
            common_1.Logger,
            varifications_repository_1.VarificationsRepository,
            auth_repository_1.AuthRepository,
        ],
    })
], VarificationsModule);
exports.VarificationsModule = VarificationsModule;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("8c7dfc4f4fa89f475960")
/******/ })();
/******/ 
/******/ }
;