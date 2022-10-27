import { PickType } from "@nestjs/swagger";
import { Room } from "src/room/domain/entity/room.entity";

export class InviteFriendDto extends PickType(Room, ["id"] as const) {}
