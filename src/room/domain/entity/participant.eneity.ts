import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from "class-validator";
import { Auth } from "src/auth/domain/entity/auth.entity";
import { Transform } from "class-transformer";
import { Users } from "src/user/domain/entity/user.entity";
import { Room } from "./room.entity";

@Index("id", ["id"], { unique: true })
@Entity({ name: "participant" })
export class Participant {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Transform((params) => params.value.trim())
  @IsNumber()
  @IsNotEmpty()
  @Column({
    type: "int",
    name: "user_id",
    comment: "유저 아이디",
  })
  user_id: number;

  @Transform((params) => params.value.trim())
  @IsNumber()
  @IsNotEmpty()
  @Column({
    type: "int",
    name: "room_id",
    comment: "방 아이디",
  })
  room_id: number;

  @ApiProperty({
    example: 4,
    description: "읽지 않은 채팅 수",
  })
  @Transform((params) => params.value.trim())
  @IsNumber()
  @Column({
    type: "int",
    name: "not_read_chatCount",
    nullable: true,
  })
  notReadChatCount: number;

  @ApiProperty({
    example: "dktnqls0624",
    description: "마지막으로 읽은 채팅 아이디",
  })
  @Transform((params) => params.value.trim())
  @IsString()
  @Column({
    type: "varchar",
    name: "last_read_chatId",
    comment: "마지막으로 읽은 채팅 아이디",
    nullable: true,
  })
  lastReadChatId: string;

  @OneToMany(() => Users, (user) => user.Participant, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  User: Users[];

  @ManyToOne(() => Room, (room) => room.Participant, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "room_id", referencedColumnName: "id" }])
  Room: Room;
}
