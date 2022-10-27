"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../../user/domain/entity/user.entity");
class FindUserDto extends (0, swagger_1.PickType)(user_entity_1.Users, ['signname']) {
}
exports.FindUserDto = FindUserDto;
//# sourceMappingURL=findUser.dto.js.map