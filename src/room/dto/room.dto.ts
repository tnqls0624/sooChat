import { PickType } from "@nestjs/swagger";
import { Users } from "src/user/domain/entity/user.entity";
import { Room } from "../domain/entity/room.entity";

export class RoomDto extends PickType(Room, [
  "lastChat",
  "roomName",
] as const) {}
