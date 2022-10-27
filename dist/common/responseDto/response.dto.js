"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: true,
        description: 'success',
    }),
    __metadata("design:type", Boolean)
], ResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: [{}],
        description: 'data',
    }),
    __metadata("design:type", Array)
], ResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        example: '2022-04-21T09:50:24.675Z',
        description: 'timestamp',
    }),
    __metadata("design:type", Date)
], ResponseDto.prototype, "timestamp", void 0);
exports.ResponseDto = ResponseDto;
//# sourceMappingURL=response.dto.js.map