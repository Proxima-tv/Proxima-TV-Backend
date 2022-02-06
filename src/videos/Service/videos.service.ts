import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Like, Repository } from 'typeorm';
import { Videos } from '../entity/videos.entity';

@Injectable()
export class VideosService {
    constructor(@InjectRepository(Videos) 
        private videoRepository: Repository<Videos>){}

    /**
     * gets videos with the requested parameters
     * @param video the requested video
     * @returns array with video resolvables
     */
    async getVideos(): Promise<Videos[]> | null{
        return await this.videoRepository.find({
            select: ["vid_id","likes","dislikes","file","title","premium"],
        });
    }

    /**
     * gets videos specified to properties given
     * @param _type the type to specify videos for
     * @param _order object specifying how to order the entries
     * @param _limit how many videos should be returned
     * @returns array with video resolvables
     */
    async getVideosByRequest(_type: String, _limit: number, _order: object): Promise<Videos[]> | null {
        try {
            return await this.videoRepository.find({
                select: ["vid_id","likes","dislikes","file","title","premium"],
                where: [{ "type": _type }],
                order: _order,
                take: _limit
            });   
        } catch (error) {
            console.log("error video not found");
            console.log(error);
            return null;
        }
    }

    /**
     * gets a video specified by its id
     * @param _id the requested video id
     * @returns the video type yet uknown
     */
    async getVideo(_id: number):Promise<Videos[]> | null {
        try {
            return await this.videoRepository.find({
                select: ["vid_id","file","premium"],
                where: [{ "vid_id": _id }]
            });
        } catch (error) {
            console.log("error video not found");
            console.log(error);
            return null
        }
    }

    /**
     * fetches statistics for a video from database
     * @param _id the video to fetch statistic data from
     * @returns JSON or null for a video when found or not
     */
    async getVideoStats(_id:number): Promise<object> | null {
        try {
            return await this.videoRepository.find({
                select: ["title", "click", "likes", "dislikes", "uploaded_on"],
                where: [{ "vid_id": _id }]
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    /**
     * inserts a video into database
     * @param video the video data
     */
    async createVideo(video: Videos) {
        this.videoRepository.save(video);
    }

    /**
     * searches the database for a given string
     * @param _query the query (part of videoname) to search by
     * @returns if anything found an array of video informations
     */
    async searchVideo(_query:string):Promise<Object> | null {
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
