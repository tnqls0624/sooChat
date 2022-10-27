"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarificationsService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nanoid_1 = require("nanoid");
const varifications_repository_1 = require("../infra/varifications.repository");
const varifications_entity_1 = require("../domain/entity/varifications.entity");
const user_repository_1 = require("../../user/infra/user.repository");
const auth_repository_1 = require("../../auth/infra/auth.repository");
let VarificationsService = class VarificationsService {
    constructor(mailerService, config, varificationsRepository, userRepository, authRepository, logger) {
        this.mailerService = mailerService;
        this.config = config;
        this.varificationsRepository = varificationsRepository;
        this.userRepository = userRepository;
        this.authRepository = authRepository;
        this.logger = logger;
        this.generateToken = () => {
            const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
            const nanoid = (0, nanoid_1.customAlphabet)(alphabet, 10)();
            return nanoid;
        };
        this.generatePassword = () => {
            const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
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
        const user = await this.userRepository.findUserforEmail(to);
        await this.mailerService
            .sendMail({
            to,
            from: `${this.config.get('EMAIL_ID')}@naver.com`,
            subject: 'Testing Nest Mailermodule with template ✔',
            template: type === varifications_entity_1.VerificationTypeEnum.MAIL
                ? 'index'
                : type === varifications_entity_1.VerificationTypeEnum.PASSWORD
                    ? 'index'
                    : 'findSignname',
            context: type === varifications_entity_1.VerificationTypeEnum.MAIL
                ? { code: key, name: user.name }
                : type === varifications_entity_1.VerificationTypeEnum.PASSWORD
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
            type: type === varifications_entity_1.VerificationTypeEnum.MAIL
                ? varifications_entity_1.VerificationTypeEnum.MAIL
                : type === varifications_entity_1.VerificationTypeEnum.PASSWORD
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
            throw new common_1.HttpException('token is required', 400);
        if (!key)
            throw new common_1.HttpException('key is required', 400);
        return this.varificationsRepository.varifyMail(body);
    }
};
VarificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, common_1.Inject)(common_1.Logger)),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService,
        varifications_repository_1.VarificationsRepository,
        user_repository_1.UserRepository,
        auth_repository_1.AuthRepository, Object])
], VarificationsService);
exports.VarificationsService = VarificationsService;
//# sourceMappingURL=varifications.service.js.map