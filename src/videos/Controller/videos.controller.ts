import { Controller, Get, Request, Post, Query, UploadedFile, UseInterceptors, Delete, Body, StreamableFile, Response } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideosService } from '../Service/videos.service';
import * as fs from 'node:fs';


@Controller('videos')
export class VideosController {
    constructor(
        private service: VideosService) {}
    @Get('videos')
    async getVideos(@Query() query, @Request() req) {
        // TODO Pull data from database

        // TODO: Verify data against proper permissions
        //      - Uses headers
        //      - checks params
        console.log(query);
        console.log(req.headers);
        
        // Assuming verification succeeded
        // Catch video data from request
        //      - requires constructed videos request string
        let order = {};
        order[query.sort]=query.order;
        //console.log(this.service.getVideosByRequest(query.type, query.limit, order));

        return {type: "reply", videos: await this.service.getVideos()}
        //CryptoService.encrypt(JSON.stringify({type: "reply", videos: await this.service.getVideos()})); // returning = replying
    }

    @Get('search')
    async searchInDB(@Body() body){
        return this.service.searchVideo(body.query);
    }

    @Get('video')
    async getVideo(@Response({passthrough:true}) res, @Request() req) {
        // TODO Pull data from database

        // TODO: Verify data against proper permissions
        //      - fix crashes when wrong id is given
        //      - Uses headers
        //      - checks params

        console.log(req.query);
        let fetched = await this.service.getVideo(JSON.parse(req.query['vidQuery'])['video']);
        console.log(fetched[0]['file'])
        //return video;
        return {file:"http://localhost:3000/public/" + fetched[0]['file'], name: fetched[0]['name'], likes: fetched[0]['likes'], dislikes: fetched[0]['dislikes'], id: fetched[0]['vid_id']};
    }

    /**
     * updloads files
     * @param file the file
     * @param query query gotten from request
     * @returns reply object
     */
    @UseInterceptors(FileInterceptor('file', {
        dest: "./uploads"
    }))
    @Post('upload')
    async postVideos(@UploadedFile() file: Express.Multer.File, @Request() req, @Body() video) {

        // TODO: get file from request and insert it after type checking into storage
        console.log(video);
        console.log(file);

        let fileName = file.filename + ".mp4";

        fs.rename(file.path, './uploads/'+ fileName, (err) => {if (err) throw err;});

        // TODO: Verify data against proper permissions
        //      - Uses headers
        //      - checks params
        //console.log(req.headers);
        video.file = fileName; // fixes undefined file issue
        video.click = 0;
        video.likes = 0;
        video.dislikes = 0;
        this.service.createVideo(video);

        // Replyies to the requester that the request was successfull
        // return {type: "reply", code: "succes"};
    }

    /**
     * updloads files
     * @param file the file
     * @param query query gotten from request
     * @returns reply object
     */
    @Delete('video')
    async deleteVideo(@Query() query, @Request() req){

        // TODO: Verify data against proper permissions
        //      - Uses headers
        //      - checks params
        console.log(query);
        console.log(req.headers);

        // Replyies to the requester that the request was successfull
        return {type: "reply", code: "succes"};
    }
}
