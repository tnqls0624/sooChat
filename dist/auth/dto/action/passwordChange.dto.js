"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordChangeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../../user/domain/entity/user.entity");
class PasswordChangeDto extends (0, swagger_1.PickType)(user_entity_1.Users, ['password']) {
}
exports.PasswordChangeDto = PasswordChangeDto;
//# sourceMappingURL=passwordChange.dto.js.map