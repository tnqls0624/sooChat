import { Logger, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import Joi from "joi";
import path, { join } from "path";
import appRoot from "app-root-path";
import { LoggerMiddleware } from "./middlewares/logger.middleware";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { Users } from "./user/domain/entity/user.entity";
import { Auth } from "./auth/domain/entity/auth.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { VarificationsModule } from "./varifications/varifications.module";
import { Varification } from "./varifications/domain/entity/varifications.entity";
// import { ServeStaticModule } from "@nestjs/serve-static";
import { ChatModule } from "./chat/chat.module";
import { GatewayModule } from "./gateway/gateway.module";
import { RoomModule } from "./room/room.module";
import { Room } from "./room/domain/entity/room.entity";
import { Participant } from "./room/domain/entity/participant.eneity";
import { FriendModule } from './friend/friend.module';
@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, "..", "assets"),
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.normalize(
        `${appRoot.path}/src/config/env/.${process.env.NODE_ENV}.env`
      ),
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid("dev", "prod").required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: "mysql",
        host: config.get("DB_HOST"),
        port: config.get("DB_PORT"),
        username: config.get("DB_USERNAME"),
        password: config.get("DB_PASSWORD"),
        database: config.get("DB_NAME"),
        entities: [Users, Auth, Varification, Room, Participant], //entity
        synchronize: true, // false로 해두는 게 안전 true로 할경우 실행시 테이블 새로 생성
        autoLoadEntities: true,
        charset: "utf8mb4",
        logging: true,
        keepConnectionAlive: true,
        timezone: "Z",
        // poolSize: {
        //   max: 20,
        //   idle: 4800,
        //   acquire: 60000,
        // },
      }),
    }),
    UserModule,
    AuthModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: "smtp.naver.com",
          port: 587,
          tls: {
            ciphers: "SSLv3",
          },
          secure: false, // true for 465, false for other ports
          auth: {
            user: config.get("EMAIL_ID"), // generated ethereal user
            pass: config.get("EMAIL_PASSWORD"), // generated ethereal password
          },
        },
        defaults: {
          from: `nest-modules <${config.get("EMAIL_ID")}@naver.com>`, // outgoing email ID
        },
        template: {
          dir: process.cwd() + "/src/template/",
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
    VarificationsModule,
    ChatModule,
    GatewayModule,
    RoomModule,
    FriendModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerMiddleware, Logger],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === "dev";
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
    // mongoose.set('debug', this.isDev);
  }
}
