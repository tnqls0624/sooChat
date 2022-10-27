import { UserRepository } from 'src/user/infra/user.repository';
import { Connection, Repository } from 'typeorm';
import { Varification } from '../domain/entity/varifications.entity';
import { VarifyMailDto } from '../dto/varifyMail.dto';
export declare class VarificationsRepository {
    private readonly userRepository;
    private readonly connection;
    private readonly varifyRepository;
    constructor(userRepository: UserRepository, connection: Connection, varifyRepository: Repository<Varification>);
    requestMail(args: {
        token: string;
        key: string;
        signname: string;
    }): Promise<string>;
    varifyMail(body: VarifyMailDto): Promise<boolean>;
    removeVarify(varification: Varification): Promise<void>;
    updateVarify(verification: Varification): Promise<void>;
    varifyMailTokenAndKey(token: string, key: string): Promise<Varification>;
    varifyMailKey(key: string, signname: string): Promise<Varification>;
}
