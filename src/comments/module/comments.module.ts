import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from '../controller/comments.controller';
import { CommentsService } from '../service/comments.service';
import { Comment } from '../Entity/comments.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    providers: [CommentsService],
    controllers: [CommentsController],
    exports: [TypeOrmModule]
})
export class CommentsModule {}
