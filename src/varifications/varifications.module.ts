import { Logger, Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Auth } from "src/auth/domain/entity/auth.entity";
import { Users } from "src/user/domain/entity/user.entity";
import { UserModule } from "src/user/user.module";
import { VarificationsController } from "./controller/varifications.controller";
import { Varification } from "./domain/entity/varifications.entity";
import { VarificationsRepository } from "./infra/varifications.repository";
import { VarificationsService } from "./service/varifications.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Auth, Varification]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [VarificationsController],
  providers: [VarificationsService, Logger, VarificationsRepository],
  exports: [VarificationsService, VarificationsRepository],
})
export class VarificationsModule {}
