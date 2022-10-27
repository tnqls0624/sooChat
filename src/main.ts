import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { winstonLogger } from "./utils/winston.util";
import { SuccessInterceptor } from "./interceptors/sucess.interceptor";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./exceptions/httpExceptions.filter";
import { RedisIoAdapter } from "./adapters/redis.adapter";
import { ConfigService } from "@nestjs/config";
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });
  const configService = app.get(ConfigService);
  // const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = `${process.env.NODE_PORT}` || 3000;
  const redisIoAdapter = new RedisIoAdapter(app, configService);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);
  // app.useStaticAssets(join(__dirname, "..", "static"));

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessInterceptor());

  const config = new DocumentBuilder()
    .setTitle("API 문서")
    .setDescription("개발을 위한 API 문서")
    .setVersion("1.0")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "authorization",
      description: "Enter JWT token",
      in: "header",
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(port);
  console.log(`Listening on port: ${port}`);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
