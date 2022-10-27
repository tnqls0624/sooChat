import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { ChatRepository } from "./infra/chat.repository";
import { ChatService } from "./service/chat.service";

@Module({
  providers: [ChatGateway, ChatService, ChatRepository],
})
export class ChatModule {}
