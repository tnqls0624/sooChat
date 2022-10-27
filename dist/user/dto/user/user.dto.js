"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../domain/entity/user.entity");
class UserDto extends (0, swagger_1.PickType)(user_entity_1.Users, [
    'signname',
    'password',
    'name',
    'email',
    'phone',
    'created_at',
    'updated_at',
    'withdraw_at',
]) {
}
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map