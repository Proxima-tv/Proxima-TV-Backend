import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from '../controller/comments.controller';
import { CommentsService } from '../service/comments.service';
import { Comments } from '../Entity/comments.entity';
import { UserService } from 'src/users/service/user.service';
import { UserModule } from 'src/users/module/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Comments]),UserModule],
    providers: [CommentsService,UserService],
    controllers: [CommentsController],
    exports: [TypeOrmModule]
})
export class CommentsModule {}
