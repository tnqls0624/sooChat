import { UserRepository } from '../infra/user.repository';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findUser(signname: string): Promise<import("../domain/entity/user.entity").Users>;
    checkDuplicatedSignname(signname: string): Promise<boolean>;
    checkDuplicatedEmail(email: string): Promise<boolean>;
    checkDuplicatedPhone(phone: string): Promise<boolean>;
}
