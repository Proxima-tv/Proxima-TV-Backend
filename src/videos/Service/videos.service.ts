import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Like, Repository } from 'typeorm';
import { Videos } from '../entity/videos.entity';

@Injectable()
export class VideosService {
    constructor(@InjectRepository(Videos) 
        private videoRepository: Repository<Videos>, 
        private connection: Connection){}

    /**
     * gets videos with the requested parameters
     * @param video the requested video
     * @returns ??? a list of videos (return type need to be logged)
     */
    async getVideos(): Promise<Videos[]> {
        return await this.videoRepository.find({
            select: ["vid_id","likes","dislikes","file","title","premium"],
        });
    }

    /**
     * gets videos specified to properties given
     * @param _type the type to specify videos for
     * @param _order object specifying how to order the entries
     * @param _limit how many videos should be returned
     * @returns ??? a list of videos (return type need to be logged)
     */
    async getVideosByRequest(_type: String, _limit: number, _order: object): Promise<Videos[]> {
        return await this.videoRepository.find({
            select: ["vid_id","likes","dislikes","file","title","premium"],
            where: [{ "type": _type }],
            order: _order,
            take: _limit
        });
    }

    /**
     * gets a video specified by its id
     * @param _id the requested video id
     * @returns the video type yet uknown
     */
    async getVideo(_id: number):Promise<Videos[]> {
        return await this.videoRepository.find({
            select: ["vid_id","file","premium"],
            where: [{ "vid_id": _id }]
        });
    }

    /**
     * inserts a video into database
     * @param video the video data
     */
    async createVideo(video: Videos) {
        this.videoRepository.save(video);
    }

    async searchVideo(_query:string):Promise<Object>{
        return await this.videoRepository.find({
            select: ["vid_id", "title", "file", "premium"],
            where: [{ "title": Like("%"+_query+"%")}]
        });
    }

    /**
     * updates video data
     * @todo test that this not creates anohter sligthly custom entrie but overrides the old one
     * @param video the new video data
     */
    async updateVideo(video: Videos) {
        this.videoRepository.save(video);
    }

    /**
     * deletes a specified video
     * @param video the video to remove
     */
    async deleteVideo(_id: number) {
        this.videoRepository.delete(_id);
    }
}
