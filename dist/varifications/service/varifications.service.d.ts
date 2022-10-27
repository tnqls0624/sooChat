import { MailerService } from '@nestjs-modules/mailer';
import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestMailDto } from 'src/varifications/dto/requestMail.dto';
import { VarificationsRepository } from '../infra/varifications.repository';
import { VerificationTypeEnum } from '../domain/entity/varifications.entity';
import { VarifyMailDto } from '../dto/varifyMail.dto';
import { UserRepository } from 'src/user/infra/user.repository';
import { AuthRepository } from 'src/auth/infra/auth.repository';
export declare class VarificationsService {
    private readonly mailerService;
    private readonly config;
    private readonly varificationsRepository;
    private readonly userRepository;
    private readonly authRepository;
    private readonly logger;
    constructor(mailerService: MailerService, config: ConfigService, varificationsRepository: VarificationsRepository, userRepository: UserRepository, authRepository: AuthRepository, logger: LoggerService);
    private generateToken;
    private generatePassword;
    private generateRandom;
    requestMail(type: VerificationTypeEnum, body: RequestMailDto): Promise<true | {
        token: string;
    }>;
    varifyMail(body: VarifyMailDto): Promise<boolean>;
}
