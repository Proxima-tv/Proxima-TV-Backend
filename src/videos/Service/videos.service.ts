import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Like, Repository } from 'typeorm';
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
            // gets latest state of the wanted video
            let video = await this.videoRepository.find({
                select: ["title", "click", "likes", "dislikes", "uploaded_on"],
                where: [{ "vid_id": _id }]
            });

            // specifies array position 
            let fetch = video[0];

            // Updates the click value as value
            fetch['click'] = video[0]["click"] += 1;

            // updates the database 
            if(await this.updateVideo(_id, {click:fetch['click']})){
                return video;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    /**
     * inserts a video into database
     * @param _video the video data
     */
    async createVideo(_video: Videos) {
        this.videoRepository.save(_video);
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
     * updates the database according to changes object
     * @param _id video by id to update 
     * @param changes the changes to make as json
     * @returns true if working false if error
     */
    async updateVideo(_id:number, _changes:object):Promise<boolean> {
        try {
            this.videoRepository.update(_id, _changes);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * deletes video specified by id
     * @param _id video to delete
     * @returns true if removal was successfull false if errors occured
     */
    async deleteVideo(_id: number):Promise<boolean> {
        try {
            let video = await this.getVideo(_id);
            console.log(video[0]["file"]);
            await fs.unlinkSync("./uploads/" + video[0]["file"]);
            await this.videoRepository.delete(_id);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
