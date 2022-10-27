"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 60:
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
var ChatGateway_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatGateway = void 0;
const common_1 = __webpack_require__(6);
const websockets_1 = __webpack_require__(61);
const socket_io_1 = __webpack_require__(62);
let ChatGateway = ChatGateway_1 = class ChatGateway {
    afterInit() {
        ChatGateway_1.logger.debug(`Socket Server Init Complete`);
    }
    handleConnection(client) {
        ChatGateway_1.logger.debug(`${client.id}(${client.handshake.query["name"]}) is connected!`);
    }
    handleDisconnect(client) {
        ChatGateway_1.logger.debug(`${client.id} is disconnected...`);
    }
    handleMessage(client, payload) {
        this.server.emit("msgToClient", payload);
    }
    async onJoinRoom(client, { room, uid }) {
        const hasJoined = client.rooms.has(room);
        if (hasJoined) {
            client.emit(EVENT.ALREADY_JOINED, room);
            return;
        }
        client.data.uid = uid;
        const roomCapacity = await this.roomsService.getRoomCapacity(parseInt(room));
        let roomCurrentCount = 0;
        if (this.server.adapter["rooms"].get(room) !== undefined) {
            roomCurrentCount = this.server.adapter["rooms"].get(room).size;
        }
        if (roomCurrentCount >= roomCapacity) {
            client.emit(EVENT.ROOM_FULL, { room });
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
        client.emit(EVENT.JOINED_ROOM, { room });
        client.to(room).emit(EVENT.NEW_USER, {
            sid: client.id,
            uid,
        });
        client.emit(EVENT.EXISTING_ROOM_USERS, {
            users: existingMembers,
            current: { sid: client.id, uid },
        });
        await this.roomsService.joinRoom(parseInt(room, 10), roomMembers.length);
        this.logger.debug(`Client joined room(${room}), sid: ${client.id}), uid: ${uid}`);
    }
};
ChatGateway.logger = new common_1.Logger(ChatGateway_1.name);
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("msgToServer"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleMessage", null);
ChatGateway = ChatGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: "chat",
        cors: {
            origin: true,
            credentials: true,
        },
        transports: ["websocket", "polling"],
        allowEIO3: true,
    })
], ChatGateway);
exports.ChatGateway = ChatGateway;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("5cb65abc71d8cdb38ed7")
/******/ })();
/******/ 
/******/ }
;