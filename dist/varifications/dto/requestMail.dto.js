"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestMailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const varifications_entity_1 = require("../domain/entity/varifications.entity");
class RequestMailDto extends (0, swagger_1.PickType)(varifications_entity_1.Varification, ['to']) {
}
exports.RequestMailDto = RequestMailDto;
//# sourceMappingURL=requestMail.dto.js.map