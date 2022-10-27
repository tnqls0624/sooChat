"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 80:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParticipantModule = void 0;
const common_1 = __webpack_require__(6);
const participant_repository_1 = __webpack_require__(82);
const participant_service_1 = __webpack_require__(81);
let ParticipantModule = class ParticipantModule {
};
ParticipantModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [participant_service_1.ParticipantService, participant_repository_1.ParticipantRepository],
        exports: [participant_service_1.ParticipantService, participant_repository_1.ParticipantRepository],
    })
], ParticipantModule);
exports.ParticipantModule = ParticipantModule;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("487af0c170c0a0ceae9e")
/******/ })();
/******/ 
/******/ }
;