import { Module } from "@nestjs/common";
import { FriendService } from "./service/friend.service";
import { FriendController } from "./controller/friend.controller";
import { FriendRepository } from "./infra/friend.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/user/domain/entity/user.entity";
import { UserModule } from "src/user/user.module";
import { Friend } from "./domain/entity/friend.eneity";

@Module({
  imports: [TypeOrmModule.forFeature([Users, Friend]), UserModule],
  controllers: [FriendController],
  providers: [FriendService, FriendRepository],
  exports: [FriendService, FriendRepository],
})
export class FriendModule {}
