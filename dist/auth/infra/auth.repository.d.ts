import { UserTypeEnum } from 'src/user/domain/entity/user.entity';
import { UpdateUserDto } from 'src/auth/dto/action/updateUser.dto';
import { UserDto } from 'src/user/dto/user/user.dto';
import { UserRepository } from 'src/user/infra/user.repository';
import { Connection } from 'typeorm';
import { VarificationsRepository } from 'src/varifications/infra/varifications.repository';
import { PasswordChangeDto } from '../dto/action/passwordChange.dto';
import { FindPasswordChangeDto } from '../dto/action/findPasswordChange.dto copy';
export declare class AuthRepository {
    private readonly connection;
    private readonly userRepository;
    private readonly varifyRepository;
    constructor(connection: Connection, userRepository: UserRepository, varifyRepository: VarificationsRepository);
    createUser(args: {
        withdraw: string;
        varifymail: string;
        method: UserTypeEnum;
        signname: string;
        password: string;
        name: string;
        email: string;
        phone: string;
    }): Promise<any>;
    loginUser(refreshToken: string, signname: string): Promise<boolean>;
    updateUser(signname: string, body: UpdateUserDto): Promise<boolean>;
    changePassword(user: UserDto, body: PasswordChangeDto): Promise<boolean>;
    findPasswordChange(key: string, body: FindPasswordChangeDto): Promise<boolean>;
    deleteUser(user: UserDto): Promise<boolean>;
}
