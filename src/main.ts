import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const fs = require('fs');
  // const keyFile  = fs.readFileSync(__dirname + '/../ssl/mydomain.com.key.pem');
  // const certFile = fs.readFileSync(__dirname + '/../ssl/mydomain.com.crt.pem');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: console,
    // httpsOptions: {
    //    key: keyFile,
    //    cert: certFile,
    // }
  });
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/public/'
  });
  await app.listen(3000);
}
bootstrap();
