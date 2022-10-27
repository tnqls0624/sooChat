"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindPasswordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../../user/domain/entity/user.entity");
class FindPasswordDto extends (0, swagger_1.PickType)(user_entity_1.Users, ['email']) {
}
exports.FindPasswordDto = FindPasswordDto;
//# sourceMappingURL=findPassword.dto.js.map