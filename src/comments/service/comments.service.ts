import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Comment } from '../Entity/comments.entity';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comment)
    private commentRepository:Repository<Comment>,
    private connection: Connection){}

    /**
     * creates comment from given data
     * @param comment received data from comment
     */
    async createComment(comment:Comment){
        this.commentRepository.save(comment);
    }

    /**
     * gets all comments from video
     * @param _video the video to receive
     * @returns 
     */
    async getComments(_video:number):Promise<Comment[]>{
        // TODO get data from datbase
        // CURRENT ONGOIN ISSUE: NOT ALL DATA PRESENT
        return await this.commentRepository.find({
            select:["author", "comment"],
            where: [{"video":_video}],
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
     * @param comment the received comment to change
     */
    async updateComment(comment:Comment){
        this.commentRepository.save(comment);
    }

    /**
     * deletes a comment
     * @param comment comment to delete
     */
    async deleteComment(comment: Comment){
        await this.commentRepository.delete(comment)
    }
}
