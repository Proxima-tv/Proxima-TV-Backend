import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comments/Entity/comments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>){}

    /**
     * looks up all comments for a video
     * @param _video the video to look for
     */
    async getComments(_video:number) {
        // TODO: update when timestamp is trackable
        return await this.commentRepository.find({
            select: ['author', 'comment'],
            where: [{"video":_video}]
        });
    }

    async updateComment(){}
    async createComment(){}
    async deleteComment(){}
}
