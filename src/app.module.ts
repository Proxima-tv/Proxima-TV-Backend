import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosController } from './videos/videos.controller';
import { CryptoService } from './crypto/crypto.service';

@Module({
  imports: [],
  controllers: [AppController, VideosController],
  providers: [AppService, CryptoService],
})
export class AppModule {}
