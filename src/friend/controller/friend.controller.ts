import {
  Body,
  Controller,
  Param,
  Post,
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
import { JwtAuthGuard } from "src/auth/service/guard";
import { User } from "src/common/decorators/user.decorator";
import { ResponseDto } from "src/common/responseDto/response.dto";
import { UndefinedToNullInterceptor } from "src/interceptors/undefinedToNull.interceptor";
import { Users } from "src/user/domain/entity/user.entity";
import { InviteFriendDto } from "../dto/action/inviteFriend.dto";
import { FriendService } from "../service/friend.service";

@ApiTags("FRIEND")
@UseInterceptors(UndefinedToNullInterceptor)
@Controller("friend")
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: ResponseDto,
    description: "성공",
  })
  @ApiOperation({ summary: "친구 추가" })
  @ApiParam({
    name: "id",
    required: true,
    description: "추가시킬 친구 아이디",
    type: "int",
  })
  @Post("/add/:id")
  async addFriend(@Param("id") id: number, @User() user: Users) {
    return await this.friendService.addFriend(id, user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: ResponseDto,
    description: "성공",
  })
  @ApiOperation({ summary: "친구 찾기" })
  @Post("/findAll")
  async findAllFriend(@User() user: Users) {
    return await this.friendService.findAllFriend(user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: ResponseDto,
    description: "성공",
  })
  @ApiOperation({ summary: "친구 초대" })
  @ApiParam({
    name: "friend_id",
    required: true,
    description: "친구 초대",
    type: "int",
  })
  @Post("/invite/:friend_id")
  async joinRoom(
    @User() user: Users,
    @Param("friend_id") friend_id: number,
    @Body() body: InviteFriendDto
  ) {
    await this.friendService.inviteFriend(user.id, friend_id, body);
  }
}
