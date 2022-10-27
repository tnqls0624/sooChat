import { Module } from "@nestjs/common";
import { RoomModule } from "src/room/room.module";
import { UserModule } from "src/user/user.module";
import { RoomGateway } from "./room.gateway";
import { RoomGatewayService } from "./service/room.gateway.service";

@Module({
  imports: [RoomModule, UserModule],
  providers: [RoomGatewayService, RoomGateway],
})
export class GatewayModule {}
