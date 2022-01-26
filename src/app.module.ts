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
import { Comments } from './comments/Entity/comments.entity';
import { UserController } from './users/controller/user.controller';
import { UserModule } from './users/module/user.module';
import { UserService } from './users/service/user.service';
import { User } from './users/entity/user.entity';
import { WatchhistoryService } from './watchhistory/service/watchhistory.service';
import { WatchhistoryEntity } from './watchhistory/entities/watchhistory.entity';
import { WatchhistoryModule } from './watchhistory/module/watchhistory.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '22999',
      database: 'proxima',
      entities: [Video, Comments, User, WatchhistoryEntity],
      synchronize: true,
    }),
    VideosModule,
    CommentsModule,
    UserModule,
    WatchhistoryModule
  ],
  controllers: [AppController, VideosController, CommentsController, UserController],
  providers: [AppService, CryptoService, VideosService, CommentsService, UserService, WatchhistoryService],
})
export class AppModule {}
