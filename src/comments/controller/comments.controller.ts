import { Controller, Get, Request, Post, Query, Body } from '@nestjs/common';
import { UserService } from 'src/users/service/user.service';
import { Comments } from '../Entity/comments.entity';
import { CommentsService } from '../service/comments.service';

@Controller('comments')
export class CommentsController {
    constructor(
        private service:CommentsService, 
        private userService:UserService){}
    
    @Post('comment')
    async createComment(@Body() comment:Comments, @Request() req){
        try {
            console.log(comment);
            let date = new Date();
            
            if(comment["author"] == null) return {success:false, error: "no_author_given"};

            comment = comment['body'];
            comment["commented_on"] = "" + date.getDate(); 
            this.service.createComment(comment);
            return {success:true, code: 200};
        } catch (error) {
            console.log(error);
            return {success:false, code:"not_commented"}
        }
    }

    @Get('comments')
    async getComments(@Query() query, @Request() req){
        let comments = await this.service.getComments(JSON.parse(req.query['video'])['video'])
        let r = [];

        for(let i = 0; i<comments.length; i++) {
            let u = await this.userService.getUserById(comments[i]['author']);
            let object = {"author": u[0]['username'],"comment":comments[i]['comment']}
            r.push(object);
        }
        return r;
    }
    @Get('comments/limit')
    async getCommentsByLimit(@Body() body, @Request() req){
        console.log(body)
        //return this.service.getCommentsLimited();
    }
}
