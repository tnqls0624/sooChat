import { Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../service/auth.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService, config: ConfigService);
    validate(payload: Payload): Promise<{
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
    }>;
}
export {};
