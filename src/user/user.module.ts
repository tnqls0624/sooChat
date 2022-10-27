import { Logger, Module, forwardRef } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Auth } from "src/auth/domain/entity/auth.entity";
import { Varification } from "src/varifications/domain/entity/varifications.entity";
import { VarificationsModule } from "src/varifications/varifications.module";
import { UserController } from "./controller/user.controller";
import { Users } from "./domain/entity/user.entity";
import { UserRepository } from "./infra/user.repository";
import { UserService } from "./service/user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Auth, Varification]),
    forwardRef(() => AuthModule),
    forwardRef(() => VarificationsModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtService, Logger],
  exports: [UserService, UserRepository],
})
export class UserModule {}
