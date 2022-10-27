import { Users } from 'src/user/domain/entity/user.entity';
declare const JoinUserDto_base: import("@nestjs/common").Type<Pick<Users, "method" | "name" | "signname" | "password" | "email" | "phone">>;
export declare class JoinUserDto extends JoinUserDto_base {
}
export {};
