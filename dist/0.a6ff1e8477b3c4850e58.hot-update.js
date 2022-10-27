"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 33:
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VarificationsService = void 0;
const mailer_1 = __webpack_require__(34);
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(9);
const nanoid_1 = __webpack_require__(35);
const varifications_repository_1 = __webpack_require__(31);
const varifications_entity_1 = __webpack_require__(32);
const user_repository_1 = __webpack_require__(21);
let VarificationsService = class VarificationsService {
    constructor(mailerService, config, varificationsRepository, userRepository, logger) {
        this.mailerService = mailerService;
        this.config = config;
        this.varificationsRepository = varificationsRepository;
        this.userRepository = userRepository;
        this.logger = logger;
        this.generateToken = () => {
            const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
            const nanoid = (0, nanoid_1.customAlphabet)(alphabet, 10)();
            return nanoid;
        };
        this.generatePassword = () => {
            const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
            const nanoid = (0, nanoid_1.customAlphabet)(alphabet, 8)();
            return nanoid;
        };
        this.generateRandom = () => {
            const ranNum = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
            return String(ranNum);
        };
    }
    async requestMail(type, body) {
        const { to } = body;
        const token = this.generateToken();
        const key = this.generateRandom();
        console.log(type.includes(varifications_entity_1.VerificationTypeEnum.MAIL));
        const user = await this.userRepository.findUserforEmail(to);
        await this.mailerService
            .sendMail({
            to,
            from: `${this.config.get("EMAIL_ID")}@naver.com`,
            subject: "Testing Nest Mailermodule with template ✔",
            template: type.includes(varifications_entity_1.VerificationTypeEnum.MAIL)
                ? "index"
                : type.includes(varifications_entity_1.VerificationTypeEnum.PASSWORD)
                    ? "index"
                    : "findSignname",
            context: type.includes(varifications_entity_1.VerificationTypeEnum.MAIL)
                ? { code: key, name: user.name }
                : type.includes(varifications_entity_1.VerificationTypeEnum.PASSWORD)
                    ? { code: key, name: user.name }
                    : { name: user.name, signname: user.signname },
        })
            .then(async (success) => {
            this.logger.log(success);
        })
            .catch((err) => {
            this.logger.error(err);
        });
        const args = {
            type: type.includes(varifications_entity_1.VerificationTypeEnum.MAIL)
                ? varifications_entity_1.VerificationTypeEnum.MAIL
                : type.includes(varifications_entity_1.VerificationTypeEnum.PASSWORD)
                    ? varifications_entity_1.VerificationTypeEnum.PASSWORD
                    : varifications_entity_1.VerificationTypeEnum.SIGNNAME,
            signname: user.signname,
            to,
            token,
            key,
        };
        const resToken = await this.varificationsRepository.requestMail(args);
        const result = type === varifications_entity_1.VerificationTypeEnum.MAIL
            ? {
                token: resToken,
            }
            : type === varifications_entity_1.VerificationTypeEnum.PASSWORD
                ? true
                : true;
        return result;
    }
    varifyMail(body) {
        const { token, key } = body;
        if (!token)
            throw new common_1.HttpException("token is required", 400);
        if (!key)
            throw new common_1.HttpException("key is required", 400);
        return this.varificationsRepository.varifyMail(body);
    }
};
VarificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, common_1.Inject)(common_1.Logger)),
    __metadata("design:paramtypes", [typeof (_a = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof varifications_repository_1.VarificationsRepository !== "undefined" && varifications_repository_1.VarificationsRepository) === "function" ? _c : Object, typeof (_d = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _d : Object, typeof (_e = typeof common_1.LoggerService !== "undefined" && common_1.LoggerService) === "function" ? _e : Object])
], VarificationsService);
exports.VarificationsService = VarificationsService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e39c1402894fc974571f")
/******/ })();
/******/ 
/******/ }
;