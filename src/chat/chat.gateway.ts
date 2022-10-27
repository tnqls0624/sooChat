import { Logger, UsePipes } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  namespace: "chat",
  cors: {
    origin: true,
    credentials: true,
  },
  transports: ["websocket", "polling"],
  allowEIO3: true,
}) // namespace는 optional 입니다!
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private static readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  afterInit() {
    ChatGateway.logger.debug(`Socket Server Init Complete`);
  }

  handleConnection(client: Socket) {
    ChatGateway.logger.debug(
      `${client.id}(${client.handshake.query["name"]}) is connected!`
    );
    // console.log(client.handshake.query.name);
    // console.log(client.data);
    // this.server.emit("msgToClient", {
    //   name: `asd`,
    //   text: `join chat.`,
    // });
  }

  handleDisconnect(client: Socket) {
    ChatGateway.logger.debug(`${client.id} is disconnected...`);
  }

  @SubscribeMessage("msgToServer")
  handleMessage(client: Socket, payload: { name: string; text: string }): void {
    this.server.emit("msgToClient", payload);
  }

  @SubscribeMessage("connect")
  handleConnect(client: Socket, payload: { name: string; text: string }): void {
    console.log("1");
    this.server.emit("msgToClient", payload);
  }
}
