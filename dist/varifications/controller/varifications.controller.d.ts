import { RequestMailDto } from 'src/varifications/dto/requestMail.dto';
import { VerificationTypeEnum } from '../domain/entity/varifications.entity';
import { VarifyMailDto } from '../dto/varifyMail.dto';
import { VarificationsService } from '../service/varifications.service';
export declare class VarificationsController {
    private varificationsService;
    constructor(varificationsService: VarificationsService);
    requestMail(type: VerificationTypeEnum, body: RequestMailDto): Promise<true | {
        token: string;
    }>;
    varifyMail(body: VarifyMailDto): Promise<boolean>;
}
