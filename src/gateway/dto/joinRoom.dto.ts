import { ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@ApiTags("socket")
export class JoinRoomDto {
  @IsNumber()
  @IsNotEmpty()
  room: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
