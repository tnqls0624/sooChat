"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonLogger = void 0;
const nest_winston_1 = require("nest-winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const env = process.env.NODE_ENV;
const logDir = path_1.default.normalize(`${app_root_path_1.default}/logs`);
const dailyOptions = (level) => {
    return {
        level,
        datePattern: 'YYYY-MM-DD',
        dirname: logDir + `/${level}`,
        filename: `%DATE%.${level}.log`,
        maxFiles: 30,
        zippedArchive: true,
    };
};
exports.winstonLogger = nest_winston_1.WinstonModule.createLogger({
    transports: [
        new winston_1.default.transports.Console({
            level: env === 'prod' ? 'http' : 'silly',
            format: env === 'production'
                ?
                    winston_1.default.format.simple()
                : winston_1.default.format.combine(winston_1.default.format.timestamp(), nest_winston_1.utilities.format.nestLike('server', {
                    prettyPrint: true,
                })),
        }),
        new winston_daily_rotate_file_1.default(dailyOptions('info')),
        new winston_daily_rotate_file_1.default(dailyOptions('error')),
    ],
});
//# sourceMappingURL=winston.util.js.map