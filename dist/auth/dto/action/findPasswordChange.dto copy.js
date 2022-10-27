"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindPasswordChangeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../../user/domain/entity/user.entity");
class FindPasswordChangeDto extends (0, swagger_1.PickType)(user_entity_1.Users, [
    'signname',
    'password',
]) {
}
exports.FindPasswordChangeDto = FindPasswordChangeDto;
//# sourceMappingURL=findPasswordChange.dto%20copy.js.map