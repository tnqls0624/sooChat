import { Users } from 'src/user/domain/entity/user.entity';
declare const LoginUserDto_base: import("@nestjs/common").Type<Pick<Users, "method" | "signname" | "password">>;
export declare class LoginUserDto extends LoginUserDto_base {
}
export {};
