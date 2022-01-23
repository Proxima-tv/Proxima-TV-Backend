import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/videos/Entity/video.entity';
import { VideosService } from 'src/videos/Service/videos.service';
import { VideosController } from '../Controller/videos.controller';

@Module({
    imports:[TypeOrmModule.forFeature([Video])],
    providers: [VideosService],
    controllers: [VideosController],
    exports: [TypeOrmModule]
})
export class VideosModule {}
