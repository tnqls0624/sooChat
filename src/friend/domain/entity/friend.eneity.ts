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
import { Transform } from "class-transformer";
import { Users } from "src/user/domain/entity/user.entity";

@Index("id", ["id"], { unique: true })
@Entity({ name: "friend" })
export class Friend {
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
    name: "friend_id",
    comment: "친구 아이디",
  })
  friend_id: number;

  @UpdateDateColumn({ name: "update_at", comment: "수정일" })
  updated_at: Date;

  @CreateDateColumn({ name: "create_at", comment: "생성일" })
  created_at: Date;

  @OneToMany(() => Users, (user) => user.Friend, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  User: Users[];

  @OneToMany(() => Users, (user) => user.Friend, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "friend_id", referencedColumnName: "id" }])
  Friend: Users[];
}
