"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 51:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const common_1 = __webpack_require__(6);
const jwt_1 = __webpack_require__(20);
const typeorm_1 = __webpack_require__(15);
const auth_module_1 = __webpack_require__(16);
const auth_entity_1 = __webpack_require__(26);
const varifications_entity_1 = __webpack_require__(32);
const varifications_module_1 = __webpack_require__(55);
const user_controller_1 = __webpack_require__(52);
const user_entity_1 = __webpack_require__(22);
const user_repository_1 = __webpack_require__(21);
const user_service_1 = __webpack_require__(53);
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.Users, auth_entity_1.Auth, varifications_entity_1.Varification]),
            varifications_module_1.VarificationsModule,
            auth_module_1.AuthModule,
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, user_repository_1.UserRepository, jwt_1.JwtService, common_1.Logger],
    })
], UserModule);
exports.UserModule = UserModule;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("a737645577a38141c57f")
/******/ })();
/******/ 
/******/ }
;