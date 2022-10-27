"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 74:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomRepository = void 0;
const common_1 = __webpack_require__(6);
const typeorm_1 = __webpack_require__(15);
const typeorm_2 = __webpack_require__(23);
const participant_eneity_1 = __webpack_require__(28);
const room_entity_1 = __webpack_require__(29);
let RoomRepository = class RoomRepository {
    constructor(connection, roomRepository) {
        this.connection = connection;
        this.roomRepository = roomRepository;
        this.logger = new common_1.Logger("RoomsRepository");
    }
    async createRoom(args) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.save(room_entity_1.Room, args);
            await queryRunner.commitTransaction();
            const reuslt = {
                result: true,
            };
            return reuslt;
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
    }
    async findjoinRoom(user) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const participant = await queryRunner.manager.find(participant_eneity_1.Participant, {
                where: { user_id: user.id },
            });
            const room = await queryRunner.manager
                .createQueryBuilder()
                .select("room")
                .from(room_entity_1.Room, "room")
                .whereInIds(participant.map((v) => v.room_id))
                .getMany();
            console.log(room);
            await queryRunner.commitTransaction();
            return;
        }
        catch (error) {
            console.log(error);
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
    }
    async joinRoom(room_id, existingRoomMembersLength, user_id) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const room = await queryRunner.manager.findOne(room_entity_1.Room, {
            where: { id: room_id },
        });
        if (!room) {
            throw new common_1.HttpException("Room not found :: no data", 400);
        }
        const participant = await queryRunner.manager.findOne(participant_eneity_1.Participant, {
            where: { room_id, user_id },
        });
        if (participant) {
            throw new common_1.HttpException("Participant already join :: duplicated id", 400);
        }
        try {
            const participantArgs = {
                room_id,
                user_id,
                not_read_chatCount: 0,
            };
            await Promise.all([
                await queryRunner.manager.save(participant_eneity_1.Participant, participantArgs),
                await queryRunner.manager
                    .createQueryBuilder()
                    .update(room_entity_1.Room)
                    .set({ total: existingRoomMembersLength + 1 })
                    .where("id = :id", { id: room_id })
                    .execute()
            ]);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error, 400);
        }
        finally {
            await queryRunner.release();
        }
        console.log("방참가!:", room_id, existingRoomMembersLength);
    }
    async findAllRoom(user) {
        const {} = user;
    }
};
RoomRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(room_entity_1.Room)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Connection !== "undefined" && typeorm_2.Connection) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], RoomRepository);
exports.RoomRepository = RoomRepository;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("6afcb4557b3398030956")
/******/ })();
/******/ 
/******/ }
;