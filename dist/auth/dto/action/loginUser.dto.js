"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../../user/domain/entity/user.entity");
class LoginUserDto extends (0, swagger_1.PickType)(user_entity_1.Users, [
    'method',
    'signname',
    'password',
]) {
}
exports.LoginUserDto = LoginUserDto;
//# sourceMappingURL=loginUser.dto.js.map