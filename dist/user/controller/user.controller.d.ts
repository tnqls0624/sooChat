import { UserService } from '../service/user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    checkDuplicatedSignname(signname: string): Promise<boolean>;
    checkDuplicatedEmail(email: string): Promise<boolean>;
    checkDuplicatedPhone(phone: string): Promise<boolean>;
    findUser(signname: string): Promise<import("../domain/entity/user.entity").Users>;
}
