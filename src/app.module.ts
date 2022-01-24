import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { VideosController } from './videos/Controller/videos.controller';
import { CryptoService } from './crypto/Service/crypto.service';
import { VideosService } from './videos/Service/videos.service';
import { Video } from './videos/Entity/video.entity';
import { VideosModule } from './videos/module/videos.module';
import { CommentsService } from './comments/service/comments.service';
import { CommentsModule } from './comments/module/comments.module';
import { CommentsController } from './comments/controller/comments.controller';
import { Comment } from './comments/Entity/comments.entity';
import { User.ModuleModule } from './users/module/user.module/user.module.module';
import { User.ServiceService } from './users/service/user.service/user.service.service';
import { UserController } from './users/controller/user/user.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '22999',
      database: 'proxima',
      entities: [Video,Comment],
      synchronize: true,
    }),
    VideosModule,
    CommentsModule,
    User.ModuleModule,
  ],
  controllers: [AppController, VideosController, CommentsController, UserController],
  providers: [AppService, CryptoService, VideosService, CommentsService, User.ServiceService],
})
export class AppModule {}
