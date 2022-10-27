"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 75:
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoomGatewayService = void 0;
const common_1 = __webpack_require__(6);
const rooms_service_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'src/rooms/rooms.service'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const records_service_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'src/records/records.service'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const users_service_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'src/users/users.service'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const event_enum_1 = __webpack_require__(73);
let RoomGatewayService = class RoomGatewayService {
    constructor(roomsService, usersService, recordsService) {
        this.roomsService = roomsService;
        this.usersService = usersService;
        this.recordsService = recordsService;
        this.logger = new common_1.Logger("RoomGateway");
    }
    onAfterInit(server) {
        this.setServer(server);
        this.logger.log("Initialized RoomGateway");
    }
    setServer(server) {
        this.server = server;
    }
    onConnection(client) {
        this.logger.debug(`Client connected, sid: ${client.id}`);
        client.on("disconnecting", (reason) => {
            const roomsToLeave = this.server.adapter["sids"].get(client.id);
            if (roomsToLeave) {
                const rooms = [...roomsToLeave].filter((room) => room !== client.id);
                rooms.forEach(async (room) => {
                    const currentRoomMembers = await this.server.in(room).fetchSockets();
                    await this.roomsService.leaveRoom(parseInt(room, 10), currentRoomMembers.length - 1);
                    client.to(room).emit(event_enum_1.EVENT.LEFT_ROOM, {
                        sid: client.id,
                    });
                });
            }
        });
    }
    onDisconnect(client) {
        this.logger.debug(`Client disconnected, sid: ${client.id}`);
    }
    async onJoinRoom(client, { room, uid }) {
        const hasJoined = client.rooms.has(room);
        if (hasJoined) {
            client.emit(event_enum_1.EVENT.ALREADY_JOINED, room);
            return;
        }
        client.data.uid = uid;
        const roomCapacity = await this.roomsService.getRoomCapacity(parseInt(room));
        let roomCurrentCount = 0;
        if (this.server.adapter["rooms"].get(room) !== undefined) {
            roomCurrentCount = this.server.adapter["rooms"].get(room).size;
        }
        if (roomCurrentCount >= roomCapacity) {
            client.emit(event_enum_1.EVENT.ROOM_FULL, { room });
            return;
        }
        const roomMembers = await this.server.in(room).fetchSockets();
        const existingMembers = roomMembers.map((roomMember) => {
            return {
                sid: roomMember.id,
                uid: roomMember.data.uid,
            };
        });
        client.join(room);
        client.emit(event_enum_1.EVENT.JOINED_ROOM, { room });
        client.to(room).emit(event_enum_1.EVENT.NEW_USER, {
            sid: client.id,
            uid,
        });
        client.emit(event_enum_1.EVENT.EXISTING_ROOM_USERS, {
            users: existingMembers,
            current: { sid: client.id, uid },
        });
        await this.roomsService.joinRoom(parseInt(room, 10), roomMembers.length);
        this.logger.debug(`Client joined room(${room}), sid: ${client.id}), uid: ${uid}`);
    }
    onCallUser(client, payload) {
        client.to(payload.to).emit(event_enum_1.EVENT.CALL_MADE, {
            sid: client.id,
            offer: payload.offer,
        });
    }
    onMakeAnswer(client, payload) {
        client.to(payload.to).emit(event_enum_1.EVENT.ANSWER_MADE, {
            sid: client.id,
            answer: payload.answer,
        });
    }
};
RoomGatewayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof rooms_service_1.RoomsService !== "undefined" && rooms_service_1.RoomsService) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object, typeof (_c = typeof records_service_1.RecordsService !== "undefined" && records_service_1.RecordsService) === "function" ? _c : Object])
], RoomGatewayService);
exports.RoomGatewayService = RoomGatewayService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("200205a8ca06d3dc5450")
/******/ })();
/******/ 
/******/ }
;