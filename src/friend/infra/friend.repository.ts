import { HttpException, Injectable } from "@nestjs/common";
import { Participant } from "src/room/domain/entity/participant.eneity";
import { Room } from "src/room/domain/entity/room.entity";
import { Users } from "src/user/domain/entity/user.entity";
import { UserService } from "src/user/service/user.service";
import { Connection, QueryRunner } from "typeorm";
import { Friend } from "../domain/entity/friend.eneity";
import { InviteFriendDto } from "../dto/action/inviteFriend.dto";

@Injectable()
export class FriendRepository {
  constructor(
    private readonly connection: Connection,
    private readonly userService: UserService
  ) {}
  async addFriend(id: number, user: Users) {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    await this.userService.findUserId(id);

    try {
      const args = {
        user_id: user.id,
        friend_id: id,
      };
      const friend = await queryRunner.manager.save(Friend, args);
      await queryRunner.commitTransaction();
      return;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException(error, 400);
    } finally {
      await queryRunner.release();
    }
  }

  async findAllFriend(user: Users) {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const friend = await queryRunner.manager
        .find(Friend, {
          where: {
            user_id: user.id,
          },
        })
        .then(async (v) => {
          return await queryRunner.manager
            .createQueryBuilder()
            .select("user.id")
            .addSelect("user.method")
            .addSelect("user.signname")
            .addSelect("user.name")
            .addSelect("user.email")
            .addSelect("user.phone")
            .addSelect("user.varifymail")
            .addSelect("user.withdraw")
            .addSelect("user.updated_at")
            .addSelect("user.created_at")
            .from(Users, "user")
            .whereInIds(v.map((v) => v.friend_id))
            .andWhere({ withdraw: "false" })
            .getMany();
        });
      await queryRunner.commitTransaction();
      return friend;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException(error, 400);
    } finally {
      await queryRunner.release();
    }
  }

  async inviteRoom(user_id: number, friend_id: number, body: InviteFriendDto) {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const room = await queryRunner.manager.findOne(Room, {
      where: { id: body.id },
    });
    if (!room) {
      throw new HttpException("Room not found :: no data", 400);
    }

    const friend = await queryRunner.manager.findOne(Friend, {
      where: { friend_id },
    });

    if (!friend) {
      throw new HttpException("Friend not found :: no data", 400);
    }

    const participant = await queryRunner.manager.findOne(Participant, {
      where: { room_id: room.id, user_id: friend_id },
    });
    if (participant) {
      throw new HttpException("Participant already join :: duplicated id", 400);
    }

    try {
      const participantArgs = {
        room_id: room.id,
        user_id: friend_id,
        not_read_chatCount: 0,
      };

      await Promise.all([
        queryRunner.manager.save(Participant, participantArgs),
        queryRunner.manager
          .createQueryBuilder()
          .update(Room)
          .set({ total: room.total + 1 })
          .where("id = :id", { id: room.id })
          .execute(),
      ]);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error, 400);
    } finally {
      await queryRunner.release();
    }
  }
}
