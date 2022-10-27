import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";
import { Users } from "src/user/domain/entity/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Index("id", ["id"], { unique: true })
@Entity({ name: "auth" })
export class Auth {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ApiProperty({
    example: "djsabcjxzcoj34258493yfbdjsk",
    description: "재발급 토큰",
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  refreshToken: string;

  @Column({
    type: "varchar",
    name: "user_id",
    comment: "리프레시 토큰ID",
    primary: true,
  })
  user_id: string;

  @CreateDateColumn({ name: "create_at", comment: "생성일" })
  created_at: Date;

  @UpdateDateColumn({ name: "update_at", comment: "수정일" })
  updated_at: Date;

  @OneToOne(() => Users, (user) => user.id, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  User: Users;
}
