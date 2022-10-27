"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarifyMailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const varifications_entity_1 = require("../domain/entity/varifications.entity");
class VarifyMailDto extends (0, swagger_1.PickType)(varifications_entity_1.Varification, [
    'token',
    'key',
]) {
}
exports.VarifyMailDto = VarifyMailDto;
//# sourceMappingURL=varifyMail.dto.js.map