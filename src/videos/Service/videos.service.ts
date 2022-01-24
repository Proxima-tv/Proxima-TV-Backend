import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Video } from '../Entity/video.entity';

@Injectable()
export class VideosService {
    constructor(@InjectRepository(Video) 
        private videoRepository: Repository<Video>, 
        private connection: Connection){}

    /**
     * gets videos with the requested parameters
     * @param video the requested video
     * @returns ??? a list of videos (return type need to be logged)
     */
    async getVideos(): Promise<Video[]> {
        return await this.videoRepository.find();
    }

    /**
     * gets videos specified to properties given
     * @param _type the type to specify videos for
     * @param _order object specifying how to order the entries
     * @param _limit how many videos should be returned
     * @returns ??? a list of videos (return type need to be logged)
     */
    async getVideosByRequest(_type: String, _limit: number, _order: object): Promise<Video[]> {
        return await this.videoRepository.find({
            select: ["vid_id", "name", "file", "vip"],
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
    async getVideo(_id: number):Promise<Video[]> {
        return await this.videoRepository.find({
            select: ["vid_id", "name", "file", "vip"],
            where: [{ "vid_id": _id }]
        });
    }

    /**
     * inserts a video into database
     * @param video the video data
     */
    async createVideo(video: Video) {
        this.videoRepository.save(video);
    }

    /**
     * updates video data
     * @todo test that this not creates anohter sligthly custom entrie but overrides the old one
     * @param video the new video data
     */
    async updateVideo(video: Video) {
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
