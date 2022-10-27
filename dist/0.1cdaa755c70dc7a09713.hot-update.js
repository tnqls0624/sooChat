"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 18:
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(6);
const bcrypt_1 = __importStar(__webpack_require__(19));
const jwt_1 = __webpack_require__(20);
const config_1 = __webpack_require__(9);
const user_repository_1 = __webpack_require__(21);
const user_entity_1 = __webpack_require__(22);
const moment_1 = __importDefault(__webpack_require__(14));
const axios_1 = __importDefault(__webpack_require__(30));
const google_auth_library_1 = __webpack_require__(31);
const auth_repository_1 = __webpack_require__(32);
const varifications_service_1 = __webpack_require__(35);
let AuthService = class AuthService {
    constructor(jwtService, config, usersRepository, authRepository, varificationService) {
        this.jwtService = jwtService;
        this.config = config;
        this.usersRepository = usersRepository;
        this.authRepository = authRepository;
        this.varificationService = varificationService;
    }
    async validateUser(signname, password) {
        const user = await this.usersRepository.findUser(signname);
        if (!user) {
            throw new common_1.HttpException("Not User", 400);
        }
        const bcryptPassWord = await bcrypt_1.default.compare(password, user.password);
        if (bcryptPassWord) {
            const { password, withdraw_at } = user, userWithoutPassword = __rest(user, ["password", "withdraw_at"]);
            return userWithoutPassword;
        }
        return null;
    }
    async jwtLogIn(data) {
        const { signname, password } = data;
        const user = await this.validateUser(signname, password);
        if (!user) {
            throw new common_1.HttpException("유저가 존재하지 않습니다.", 400);
        }
        const accessToken = this.jwtService.sign(data, {
            secret: this.config.get("JWT_ACCESS_TOKEN_SECRET"),
            expiresIn: this.config.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME"),
        });
        const refreshToken = this.jwtService.sign(data, {
            secret: this.config.get("JWT_REFRESH_TOKEN_SECRET"),
            expiresIn: this.config.get("JWT_REFRESH_TOKEN_EXPIRATION_TIME"),
        });
        const result = {
            accessToken,
            refreshToken,
        };
        return result;
    }
    async socialLogIn(data) {
        const accessToken = this.jwtService.sign(data, {
            secret: this.config.get("JWT_ACCESS_TOKEN_SECRET"),
        });
        const refreshToken = this.jwtService.sign(data, {
            secret: this.config.get("JWT_REFRESH_TOKEN_SECRET"),
        });
        const result = {
            accessToken,
            refreshToken,
        };
        return result;
    }
    async reissueToken(data) {
        const { refreshToken } = data;
        const decodedRefreshToken = this.jwtService.decode(refreshToken, this.config.get("JWT_REFRESH_TOKEN_SECRET"));
        const aa = JSON.stringify(decodedRefreshToken);
        console.log(aa.signname);
        const accessToken = this.jwtService.sign(data, {
            secret: this.config.get("JWT_ACCESS_TOKEN_SECRET"),
        });
        console.log(decodedRefreshToken);
        const result = {
            accessToken,
            refreshToken,
        };
        return result;
    }
    async createUser(body) {
        const { signname, password, method } = body;
        const created_at = (0, moment_1.default)().toISOString();
        try {
            if (method === user_entity_1.UserTypeEnum.KAKAO) {
                const { data: response } = await axios_1.default.get("https://kapi.kakao.com/v2/user/me", {
                    headers: {
                        Authorization: `Bearer ${password}`,
                    },
                });
                body.signname = String(response.id) + `@${user_entity_1.UserTypeEnum.KAKAO}`;
                body.password = await (0, bcrypt_1.hash)(signname + created_at, 10);
            }
            else if (method === user_entity_1.UserTypeEnum.GOOGLE) {
            }
            else if (method === user_entity_1.UserTypeEnum.NAVER) {
                const { data: { response }, } = await axios_1.default.get("https://openapi.naver.com/v1/nid/me", {
                    headers: {
                        Authorization: `Bearer ${body.password}`,
                    },
                });
                body.signname = String(response.id) + `@${user_entity_1.UserTypeEnum.NAVER}`;
                body.password = await (0, bcrypt_1.hash)(signname + created_at, 10);
            }
            else {
                body.password = await bcrypt_1.default.hash(body.password, 12);
            }
            const args = Object.assign(Object.assign({}, body), { withdraw: "false", varifymail: "false" });
            const result = this.authRepository.createUser(args);
            return result;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error, 400);
        }
    }
    async loginUser(body) {
        const created_at = (0, moment_1.default)().toISOString();
        let refreshToken;
        let accessToken;
        try {
            if (body.method === user_entity_1.UserTypeEnum.KAKAO) {
                const { data: response } = await axios_1.default.get("https://kapi.kakao.com/v2/user/me", {
                    headers: {
                        Authorization: `Bearer ${body.password}`,
                    },
                });
                body.signname = String(response.id) + `@${user_entity_1.UserTypeEnum.KAKAO}`;
                const user = await this.usersRepository.findUser(body.signname);
                if (!user) {
                    const joinData = {
                        method: user_entity_1.UserTypeEnum.KAKAO,
                        signname: body.signname,
                        password: body.password,
                    };
                    await this.createUser(joinData);
                }
                body.password = await (0, bcrypt_1.hash)(String(response.id) + created_at, 10);
                ({ refreshToken, accessToken } = await this.socialLogIn(body));
            }
            else if (body.method === user_entity_1.UserTypeEnum.GOOGLE) {
                const client = new google_auth_library_1.OAuth2Client(this.config.get("GOOGLE_CLIENT_KEY"));
                const ticket = await client.verifyIdToken({
                    idToken: body.password,
                    audience: this.config.get("GOOGLE_CLIENT_KEY"),
                });
                const payload = ticket.getPayload();
                if (!payload)
                    throw new common_1.HttpException("invalid token", 400);
                const userid = payload.sub || "";
                body.signname = String(userid) + `@${user_entity_1.UserTypeEnum.GOOGLE}`;
                const user = await this.usersRepository.findUser(body.signname);
                if (!user) {
                    const joinData = {
                        method: user_entity_1.UserTypeEnum.KAKAO,
                        signname: body.signname,
                        password: body.password,
                    };
                    await this.createUser(joinData);
                }
                body.password = await (0, bcrypt_1.hash)(String(userid) + created_at, 10);
                ({ refreshToken, accessToken } = await this.socialLogIn(body));
            }
            else if (body.method === user_entity_1.UserTypeEnum.NAVER) {
                const { data: { response }, } = await axios_1.default.get("https://openapi.naver.com/v1/nid/me", {
                    headers: {
                        Authorization: `Bearer ${body.password}`,
                    },
                });
                body.signname = String(response.id) + `@${user_entity_1.UserTypeEnum.NAVER}`;
                const user = await this.usersRepository.findUser(body.signname);
                if (!user) {
                    const joinData = {
                        method: user_entity_1.UserTypeEnum.NAVER,
                        signname: body.signname,
                        password: body.password,
                        email: response.email,
                        phone: response.mobile.replace(/\-/g, ""),
                        name: response.name,
                    };
                    await this.createUser(joinData);
                }
                body.password = await (0, bcrypt_1.hash)(String(response.id) + created_at, 10);
                ({ refreshToken, accessToken } = await this.socialLogIn(body));
            }
            else {
                ({ refreshToken, accessToken } = await this.jwtLogIn(body));
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error, 400);
        }
        await this.authRepository.loginUser(refreshToken, body.signname);
        const result = {
            accessToken,
            refreshToken,
        };
        return result;
    }
    async updateUser(signname, body) {
        const reuslt = this.authRepository.updateUser(signname, body);
        return reuslt;
    }
    async changePassword(user, body) {
        const reuslt = this.authRepository.changePassword(user, body);
        return reuslt;
    }
    async findPasswordChange(key, body) {
        const reuslt = this.authRepository.findPasswordChange(key, body);
        return reuslt;
    }
    async deleteUser(user) {
        const reuslt = this.authRepository.deleteUser(user);
        return reuslt;
    }
    async kakaoCallback(req) {
        const { data: { access_token }, } = await axios_1.default.post("https://kauth.kakao.com/oauth/token", {
            grant_type: "authorization_code",
            client_id: this.config.get("KAKAO_REST_API"),
            redirect_uri: this.config.get("KAKAO_CALL_BACK"),
            code: req.query.code,
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const data = {
            method: user_entity_1.UserTypeEnum.KAKAO,
            signname: "KAKAO",
            password: access_token,
        };
        return await this.loginUser(data);
    }
    async naverCallback(req) {
        const { data: { access_token }, } = await axios_1.default.post("https://nid.naver.com/oauth2.0/token", {
            grant_type: "authorization_code",
            client_id: this.config.get("NAVER_REST_API"),
            client_secret: this.config.get("NAVER_SECRET"),
            code: req.query.code,
            state: "STATE_STRING",
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const data = {
            method: user_entity_1.UserTypeEnum.NAVER,
            signname: "NAVER",
            password: access_token,
        };
        return await this.loginUser(data);
    }
    async googleCallback(req) {
        const data = {
            method: user_entity_1.UserTypeEnum.GOOGLE,
            signname: "GOOGLE",
            password: req.idToken,
        };
        return await this.loginUser(data);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _c : Object, typeof (_d = typeof auth_repository_1.AuthRepository !== "undefined" && auth_repository_1.AuthRepository) === "function" ? _d : Object, typeof (_e = typeof varifications_service_1.VarificationsService !== "undefined" && varifications_service_1.VarificationsService) === "function" ? _e : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f26e79eb25cb9b8a6008")
/******/ })();
/******/ 
/******/ }
;