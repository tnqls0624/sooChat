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
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Auth } from "src/auth/domain/entity/auth.entity";
import { Transform } from "class-transformer";
import { Participant } from "./participant.eneity";

export enum RoomTypeEnum {
  INDIVIDUAL = "INDIVIDUAL",
  GROUP = "GROUP",
}

@Index("id", ["id"], { unique: true })
@Entity({ name: "room" })
export class Room {
  @ApiProperty({
    example: 1,
    description: "방번호",
  })
  @PrimaryGeneratedColumn("increment")
  id: number;

  // @ApiProperty({
  //   example: "identifer",
  //   description: "방식별자",
  // })
  // @Transform((params) => params.value.trim())
  // @IsString()
  // @IsNotEmpty()
  // @Column({ type: "varchar", comment: "방식별자", unique: true })
  // identifer: string;

  @ApiProperty({
    example: "이수빈방",
    description: "방이름",
  })
  @Transform((params) => params.value.trim())
  @IsString()
  @IsNotEmpty()
  @Column({ type: "varchar", comment: "방이름" })
  roomName: string;

  @ApiProperty({
    example: 1,
    description: "방장아이디",
  })
  @Transform((params) => params.value.trim())
  @IsNumber()
  @IsNotEmpty()
  @Column({
    type: "int",
    comment: "방장아이디",
  })
  room_master_id: number;

  @ApiProperty({
    example: "INDIVIDUAL",
    description: "방타입",
  })
  @Transform((params) => params.value.trim())
  @IsEnum(RoomTypeEnum)
  @IsNotEmpty()
  @Column({
    type: "varchar",
    comment: "방타입(INDIVIDUAL/GROUP)",
  })
  type: RoomTypeEnum;

  @Transform((params) => params.value.trim())
  @IsNumber()
  @IsNotEmpty()
  @Column({
    type: "int",
    comment: "참가인원수",
  })
  total: number;

  @ApiProperty({
    example: "동해물과 백두산이",
    description: "마지막 내용",
  })
  @Transform((params) => params.value.trim())
  @IsString()
  @Column({ type: "varchar", comment: "마지막 내용", nullable: true })
  lastChat: string;

  @CreateDateColumn({ name: "create_at", comment: "생성일" })
  created_at: Date;

  @UpdateDateColumn({ name: "update_at", comment: "수정일" })
  updated_at: Date;

  @OneToMany(() => Participant, (participant) => participant.Room, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  Participant: Participant[];
}
