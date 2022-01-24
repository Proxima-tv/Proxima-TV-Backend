import { Controller, Get, Request, Post, Query, Body } from '@nestjs/common';
import { Comment } from '../Entity/comments.entity';
import { CommentsService } from '../service/comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private service:CommentsService){}
    
    @Post('comment')
    async createComment(@Body() comment:Comment, @Request() req){
        this.service.createComment(comment);
    }

    @Get('comments')
    async getComments(@Query() query, @Request() req){
        return this.service.getComments(req.video)
    }
    @Get('comments/limit')
    async getCommentsByLimit(@Body() body, @Request() req){
        console.log(body)
        //return this.service.getCommentsLimited();
    }
}
