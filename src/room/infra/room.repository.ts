import { HttpException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/user/domain/entity/user.entity";
import { Connection, QueryRunner, Repository } from "typeorm";
import { Participant } from "../domain/entity/participant.eneity";
import { Room, RoomTypeEnum } from "../domain/entity/room.entity";

@Injectable()
export class RoomRepository {
  constructor(private readonly connection: Connection) {}

  private logger = new Logger("RoomsRepository");

  async createRoom(args: {
    room_master_id: number;
    roomName: string;
    type: RoomTypeEnum;
  }) {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const room = await queryRunner.manager.save(Room, args);

      const participantArgs = {
        room_id: room.id,
        user_id: args.room_master_id,
        not_read_chatCount: 0,
      };

      await queryRunner.manager.save(Participant, participantArgs),
        await queryRunner.commitTransaction();

      return room;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException(error, 400);
    } finally {
      await queryRunner.release();
    }
  }

  async findjoinRoom(user: Users) {
    const queryRunner: QueryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const participant = await queryRunner.manager.find(Participant, {
        where: { user_id: user.id },
      });
      const room = await queryRunner.manager
        .createQueryBuilder()
        .select("room")
        .from(Room, "room")
        .whereInIds(participant.map((v) => v.room_id))
        .getMany();

      await queryRunner.commitTransaction();
      return room;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException(error, 400);
    } finally {
      await queryRunner.release();
    }
  }

  async findAllRoom(user: Users) {
    const {} = user;
  }
}
