import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from 'src/auth/dto/action/loginUser.dto';
import { ReissueTokenDto } from 'src/auth/dto/action/reissueToken.dto';
import { UserRepository } from 'src/user/infra/user.repository';
import { UserTypeEnum } from 'src/user/domain/entity/user.entity';
import { AuthRepository } from '../infra/auth.repository';
import { UpdateUserDto } from 'src/auth/dto/action/updateUser.dto';
import { UserDto } from 'src/user/dto/user/user.dto';
import { VarificationsService } from 'src/varifications/service/varifications.service';
import { PasswordChangeDto } from '../dto/action/passwordChange.dto';
import { FindPasswordChangeDto } from '../dto/action/findPasswordChange.dto copy';
export declare class AuthService {
    private readonly jwtService;
    private readonly config;
    private readonly usersRepository;
    private readonly authRepository;
    private readonly varificationService;
    constructor(jwtService: JwtService, config: ConfigService, usersRepository: UserRepository, authRepository: AuthRepository, varificationService: VarificationsService);
    validateUser(signname: string, password: string): Promise<{
        id: number;
        method: UserTypeEnum;
        signname: string;
        name: string;
        email: string;
        phone: string;
        varifymail: string;
        withdraw: string;
        created_at: Date;
        updated_at: Date;
    }>;
    jwtLogIn(data: LoginUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    socialLogIn(data: LoginUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    reissueToken(signname: string, data: ReissueTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
        id: number;
        method: UserTypeEnum;
        signname: string;
        name: string;
        email: string;
        phone: string;
        varifymail: string;
        withdraw: string;
        created_at: Date;
        updated_at: Date;
        withdraw_at: string;
    }>;
    createUser(body: any): Promise<any>;
    loginUser(body: LoginUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    updateUser(signname: string, body: UpdateUserDto): Promise<boolean>;
    changePassword(user: UserDto, body: PasswordChangeDto): Promise<boolean>;
    findPasswordChange(key: string, body: FindPasswordChangeDto): Promise<boolean>;
    deleteUser(user: UserDto): Promise<boolean>;
    kakaoCallback(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    naverCallback(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    googleCallback(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
