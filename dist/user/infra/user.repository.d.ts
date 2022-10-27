import { Users } from 'src/user/domain/entity/user.entity';
import { Repository } from 'typeorm';
export declare class UserRepository {
    private readonly userRepository;
    constructor(userRepository: Repository<Users>);
    findUser(signname: string): Promise<Users>;
    checkDuplicatedEmail(email: string): Promise<boolean>;
    checkDuplicatedPhone(email: string): Promise<boolean>;
    duplicateUser(signname: string): Promise<Users>;
    findUserforEmail(to: string): Promise<Users>;
}
