import { Injectable, Logger } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { RoomService } from "src/room/service/room.service";
import { UserService } from "src/user/service/user.service";
import { JoinRoomDto } from "../dto/joinRoom.dto";

@Injectable()
export class RoomGatewayService {
  constructor(
    private readonly roomsService: RoomService,
    private readonly usersService: UserService
  ) {}

  private server: Server;
  private logger: Logger = new Logger("RoomGateway");

  /**
   * onInit - on init
   * set server instance
   * @param {Server} server server instance
   */
  onAfterInit(server: Server) {
    this.setServer(server);
    this.logger.log("Initialized RoomGateway");
  }

  /**
   * set server instance
   * @param {Server} server server instance
   */
  setServer(server: Server) {
    this.server = server;
  }

  onConnection(client: Socket) {
    this.logger.debug(`Client connected, sid: ${client.id}`);

    // before leaving the room, notify all users in the room that the user has left
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    client.on("disconnecting", (reason) => {
      // //this.logger.debug('disconnecting', reason);
      // const roomsToLeave: Set<string> = this.server.adapter['sids'].get(
      //   client.id,
      // );
      // if (roomsToLeave) {
      //   // rooms excluding the room the user's id room
      //   const rooms = [...roomsToLeave].filter((room) => room !== client.id);
      //   rooms.forEach(async (room) => {
      //     // get all users who in currently in the room
      //     const currentRoomMembers = await this.server.in(room).fetchSockets();
      //     // decrement room current count
      //     // minus one because current user, who is leaving, is still in the room
      //     await this.roomsService.leaveRoom(
      //       parseInt(room, 10),
      //       currentRoomMembers.length - 1,
      //     );
      //     // emit a `leftRoom` event to all users in the room except the sender
      //     client.to(room).emit(EVENT.LEFT_ROOM, {
      //       sid: client.id,
      //     });
      //   });
      // }
    });

    /**
     * onDisconnect - on disconnect
     * emit a user left event to all users in the room
     * @param {Socket} client client socket
     */
  }

  onDisconnect(client: Socket) {
    this.logger.debug(`Client disconnected, sid: ${client.id}`);
  }

  async onJoinRoom(client: Socket, { room, userId }: JoinRoomDto) {
    const hasJoined = client.rooms.has(room);
  }
}
