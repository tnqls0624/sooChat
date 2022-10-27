"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReissueTokenDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const auth_entity_1 = require("../../domain/entity/auth.entity");
class ReissueTokenDto extends (0, swagger_1.PickType)(auth_entity_1.Auth, [
    'refreshToken',
]) {
}
exports.ReissueTokenDto = ReissueTokenDto;
//# sourceMappingURL=reissueToken.dto.js.map