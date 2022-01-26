import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from '../controller/comments.controller';
import { CommentsService } from '../service/comments.service';
import { Comments } from '../Entity/comments.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Comments])],
    providers: [CommentsService],
    controllers: [CommentsController],
    exports: [TypeOrmModule]
})
export class CommentsModule {}
