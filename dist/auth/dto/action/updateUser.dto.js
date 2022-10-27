"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../../user/domain/entity/user.entity");
class UpdateUserDto extends (0, swagger_1.PickType)(user_entity_1.Users, [
    'name',
    'email',
    'phone',
]) {
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=updateUser.dto.js.map