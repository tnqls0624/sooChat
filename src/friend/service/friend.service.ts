import { Injectable } from "@nestjs/common";
import { Users } from "src/user/domain/entity/user.entity";
import { InviteFriendDto } from "../dto/action/inviteFriend.dto";
import { FriendRepository } from "../infra/friend.repository";

@Injectable()
export class FriendService {
  constructor(private readonly friendRepository: FriendRepository) {}
  async addFriend(id: number, user: Users) {
    return await this.friendRepository.addFriend(id, user);
  }

  async findAllFriend(user: Users) {
    return await this.friendRepository.findAllFriend(user);
  }

  async inviteFriend(userId: number, friend_id: number, body: InviteFriendDto) {
    await this.friendRepository.inviteRoom(userId, friend_id, body);
  }
}
