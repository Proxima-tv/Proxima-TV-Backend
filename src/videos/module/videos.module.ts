import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosService } from 'src/videos/Service/videos.service';
import { VideosController } from '../Controller/videos.controller';
import { Videos } from '../entity/videos.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Videos])],
    providers: [VideosService],
    controllers: [VideosController],
    exports: [TypeOrmModule]
})
export class VideosModule {}
