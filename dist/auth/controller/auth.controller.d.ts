import { JoinUserDto } from 'src/auth/dto/action/joinUser.dto';
import { LoginUserDto } from 'src/auth/dto/action/loginUser.dto';
import { ReissueTokenDto } from 'src/auth/dto/action/reissueToken.dto';
import { UpdateUserDto } from 'src/auth/dto/action/updateUser.dto';
import { UserDto } from 'src/user/dto/user/user.dto';
import { AuthService } from '../service/auth.service';
import { FindPasswordChangeDto } from '../dto/action/findPasswordChange.dto copy';
import { PasswordChangeDto } from '../dto/action/passwordChange.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(body: JoinUserDto): Promise<any>;
    loginUser(body: LoginUserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    changePassword(user: UserDto, body: PasswordChangeDto): Promise<boolean>;
    findPasswordChange(key: string, body: FindPasswordChangeDto): Promise<boolean>;
    getLoginUser(user: UserDto): UserDto;
    reissueToken(signname: any, body: ReissueTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
        id: number;
        method: import("../../user/domain/entity/user.entity").UserTypeEnum;
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
    updateUser(user: UserDto, body: UpdateUserDto): Promise<boolean>;
    deleteUser(user: UserDto): Promise<boolean>;
    kakaoCallback(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    googleCallback(req: any): Promise<void>;
    naverCallback(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
