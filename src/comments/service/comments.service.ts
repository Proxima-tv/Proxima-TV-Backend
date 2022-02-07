import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Comments } from '../Entity/comments.entity';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comments)
    private commentRepository:Repository<Comments>,
    private connection: Connection){}

    /**
     * creates comment from given data
     * @param comments received data from comment
     */
    async createComment(comments:Comments){
        console.log(comments)
        this.commentRepository.save(comments);
    }

    /**
     * gets all comments from video
     * @param _video the video to receive
     * @returns 
     */
    async getComments(_video:number):Promise<Comments[]>{
        // TODO get data from datbase
        // CURRENT ONGOIN ISSUE: NOT ALL DATA PRESENT
        return await this.commentRepository.find({
            select:["author", "comment"],
            where: [{"vid_id":_video}],
        });
    }

    /**
     * gets limited ammount of comments from video
     * @param _limit limts how many comments can be received
     * @param _video the video to receive comments from
     * @returns collection of comments
     */
    async getCommentsLimited(_limit:number, _video:number){
        return await this.commentRepository.find({
            select:["author", "comment"],
            where: [{"video":_video}],
            take: _limit
        })
    }

    /**
     * updates given comment
     * @param comments the received comment to change
     */
    async updateComment(comments:Comments){
        this.commentRepository.save(comments);
    }

    /**
     * deletes a comment
     * @param comments comment to delete
     */
    async deleteComment(comments:Comments){
        await this.commentRepository.delete(comments)
    }
}
