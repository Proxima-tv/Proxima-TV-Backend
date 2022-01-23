import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { VideosController } from './videos/Controller/videos.controller';
import { CryptoService } from './crypto/crypto.service';
import { VideosService } from './videos/Service/videos.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '22999',
      database: 'proxima',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [AppController, VideosController],
  providers: [AppService, CryptoService, VideosService],
})
export class AppModule {}
