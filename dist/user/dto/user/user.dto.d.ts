import { Users } from 'src/user/domain/entity/user.entity';
declare const UserDto_base: import("@nestjs/common").Type<Pick<Users, "name" | "created_at" | "updated_at" | "signname" | "password" | "email" | "phone" | "withdraw_at">>;
export declare class UserDto extends UserDto_base {
}
export {};
