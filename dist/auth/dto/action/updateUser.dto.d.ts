import { Users } from 'src/user/domain/entity/user.entity';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Pick<Users, "name" | "email" | "phone">>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
