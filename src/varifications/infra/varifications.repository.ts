import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users, UserTypeEnum } from "src/user/domain/entity/user.entity";
import { UserRepository } from "src/user/infra/user.repository";
import { Connection, QueryRunner, Repository } from "typeorm";
import {
  Varification,
  VerificationTypeEnum,
} from "../domain/entity/varifications.entity";
import { RequestMailDto } from "../dto/requestMail.dto";
import { VarifyMailDto } from "../dto/varifyMail.dto";

@Injectable()
export class VarificationsRepository {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly connection: Connection,
    @InjectRepository(Varification)
    private readonly varifyRepository: Repository<Varification>
  ) {}

  async requestMail(args: {
    type: VerificationTypeEnum;
    signname: string;
    to: string;
    token: any;
    key: string;
  }) {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.userRepository.findUser(args.signname);
      // await queryRunner.manager.save(Varification, args);
      const varification = await queryRunner.manager.findOne(Varification, {
        where: { type: args.type, to: args.to, signname: args.signname },
      });
      if (varification) {
        await queryRunner.manager.update(
          Varification,
          { id: varification.id },
          args
        );
      } else {
        await queryRunner.manager.save(Varification, args);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException(error, 400);
    } finally {
      await queryRunner.release();
    }

    return args.token;
  }

  async varifyMail(body: VarifyMailDto) {
    const { token, key } = body;

    const varification = await this.varifyMailTokenAndKey(token, key);
    await Promise.all([
      this.updateVarify(varification),
      this.removeVarify(varification),
    ]);

    return true;
  }

  async removeVarify(varification: Varification) {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.remove(Varification, varification);
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException(error, 400);
    } finally {
      await queryRunner.release();
    }
  }

  async updateVarify(verification: Varification) {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(
        Users,
        {
          signname: verification.signname,
        },
        {
          varifymail: "true",
        }
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException(error, 400);
    } finally {
      await queryRunner.release();
    }
  }

  async varifyMailTokenAndKey(token: string, key: string) {
    const verification = await this.varifyRepository.findOne({
      where: { token, key },
    });

    if (!verification) throw new HttpException("invalid token", 400);
    return verification;
  }

  async varifyMailKey(key: string, signname: string) {
    const verification = await this.varifyRepository.findOne({
      where: { type: VerificationTypeEnum.PASSWORD, key, signname },
    });

    if (!verification) throw new HttpException("not key", 400);
    return verification;
  }
}
