import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/user/domain/entity/user.entity";
import { RoomController } from "./controller/room.controller";
import { Room } from "./domain/entity/room.entity";
import { RoomRepository } from "./infra/room.repository";
import { RoomService } from "./service/room.service";

@Module({
  imports: [TypeOrmModule.forFeature([Users, Room])],
  controllers: [RoomController],
  providers: [RoomService, RoomRepository],
  exports: [RoomService],
})
export class RoomModule {}
