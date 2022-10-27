import { Injectable } from "@nestjs/common";
import { Users } from "src/user/domain/entity/user.entity";
import { RoomTypeEnum } from "../domain/entity/room.entity";
import { CreateRoomDto } from "../dto/action/createRoom.dto";
import { RoomRepository } from "../infra/room.repository";

@Injectable()
export class RoomService {
  constructor(private readonly roomRepositry: RoomRepository) {}

  async createRoom(type: RoomTypeEnum, user: Users, body: CreateRoomDto) {
    const args = {
      type,
      ...body,
      room_master_id: user.id,
      total: 0,
    };
    return await this.roomRepositry.createRoom(args);
  }

  async findjoinRoom(user: Users) {
    return await this.roomRepositry.findjoinRoom(user);
  }

  findAllRoom(user: Users) {
    this.roomRepositry.findAllRoom(user);
  }
}
