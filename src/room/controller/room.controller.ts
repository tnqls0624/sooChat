import {
  Body,
  Controller,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { userInfo } from "os";
import { JwtAuthGuard } from "src/auth/service/guard";
import { User } from "src/common/decorators/user.decorator";
import { ResponseDto } from "src/common/responseDto/response.dto";
import { UndefinedToNullInterceptor } from "src/interceptors/undefinedToNull.interceptor";
import { Users } from "src/user/domain/entity/user.entity";
import { RoomTypeEnum } from "../domain/entity/room.entity";
import { CreateRoomDto } from "../dto/action/createRoom.dto";
import { RoomService } from "../service/room.service";

@ApiTags("ROOM")
@UseInterceptors(UndefinedToNullInterceptor)
@Controller("room")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: ResponseDto,
    description: "성공",
  })
  @ApiOperation({ summary: "방 만들기" })
  @ApiQuery({
    name: "type",
    required: true,
    description: "타입",
    enum: RoomTypeEnum,
  })
  @Post("/create")
  async createRoom(
    @Query("type") type: RoomTypeEnum,
    @User() user: Users,
    @Body() body: CreateRoomDto
  ) {
    return await this.roomService.createRoom(type, user, body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: ResponseDto,
    description: "성공",
  })
  @ApiOperation({ summary: "참여된 방 찾기" })
  @Post("/findRoom/me")
  findjoinRoom(@User() user: Users) {
    return this.roomService.findjoinRoom(user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: ResponseDto,
    description: "성공",
  })
  @ApiOperation({ summary: "모든 방 찾기" })
  @ApiQuery({
    name: "type",
    required: true,
    description: "타입",
    enum: RoomTypeEnum,
  })
  @Post("/findAll")
  findAllRoom(@User() user: Users) {
    this.roomService.findAllRoom(user);
  }
}
