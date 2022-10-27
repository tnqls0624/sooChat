"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 81:
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FriendRepository = void 0;
const common_1 = __webpack_require__(6);
const participant_eneity_1 = __webpack_require__(28);
const room_entity_1 = __webpack_require__(29);
const user_entity_1 = __webpack_require__(22);
const user_service_1 = __webpack_require__(60);
const typeorm_1 = __webpack_require__(23);
const friend_eneity_1 = __webpack_require__(30);
let FriendRepository = class FriendRepository {
    constructor(connection, userService) {
        this.connection = connection;
        this.userService = userService;
    }
    async addFriend(id, user) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        await this.userService.findUserId(id);
        try {
            const args = {
                user_id: user.id,
                friend_id: id,
            };
            const friend = await queryRunner.manager.save(friend_eneity_1.Friend, args);
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
    async findAllFriend(user) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const friend = await queryRunner.manager
                .find(friend_eneity_1.Friend, {
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
                    .from(user_entity_1.Users, "user")
                    .whereInIds(v.map((v) => v.friend_id))
                    .andWhere({ withdraw: "false" })
                    .getMany();
            });
            await queryRunner.commitTransaction();
            return friend;
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
    async inviteRoom(user_id, friend_id, body) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const room = await queryRunner.manager.findOne(room_entity_1.Room, {
            where: { id: body.id },
        });
        if (!room) {
            throw new common_1.HttpException("Room not found :: no data", 400);
        }
        const friend = await queryRunner.manager.findOne(friend_eneity_1.Friend, {
            where: { id: friend_id },
        });
        if (!friend) {
            throw new common_1.HttpException("Friend not found :: no data", 400);
        }
        const participant = await queryRunner.manager.findOne(participant_eneity_1.Participant, {
            where: { room_id: room.id, user_id: friend_id },
        });
        if (participant) {
            throw new common_1.HttpException("Participant already join :: duplicated id", 400);
        }
        try {
            const participantArgs = {
                room_id: room.id,
                user_id: friend_id,
                not_read_chatCount: 0,
            };
            await Promise.all([
                queryRunner.manager.save(participant_eneity_1.Participant, participantArgs),
                queryRunner.manager
                    .createQueryBuilder()
                    .update(room_entity_1.Room)
                    .set({ total: room.total + 1 })
                    .where("id = :id", { id: room.id })
                    .execute(),
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
    }
};
FriendRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.Connection !== "undefined" && typeorm_1.Connection) === "function" ? _a : Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _b : Object])
], FriendRepository);
exports.FriendRepository = FriendRepository;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("597f9a6878f9021c7d25")
/******/ })();
/******/ 
/******/ }
;