import { Controller, Get, Request, Post, Query, UploadedFile, UseInterceptors, Delete, Body, StreamableFile, Response, Req, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideosService } from '../Service/videos.service';
import * as fs from 'node:fs';
import { query } from 'express';
import { constants } from 'node:buffer';


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

    @Get('recommends')
    async getRecommendation(@Request() req) {
        return await this.service.getVideosByRequest("nothing",4,{vid_id:"DESC"});
    }

    @Get('stats')
    async fetchStats(@Request() req) {
        console.log(JSON.parse(req.query['stats'])['video']);
        return await this.service.getVideoStats(JSON.parse(req.query['stats'])['video']);
    }

    @Get('search')
    async searchInDB(@Request() req){
        console.log(req.query);
        console.log(await this.service.searchVideo(JSON.parse(req.query["query"])["query"]));
        return await this.service.searchVideo(JSON.parse(req.query["query"])["query"]);
    }

    @Get('video/:id')
    async getVideo(@Res() res, @Request() req, @Param('id') id) {
        // TODO Pull data from database

        // TODO: Verify data against proper permissions
        //      - fix crashes when wrong id is given
        //      - Uses headers
        //      - checks params

        try {   
            const range = req.headers.range;
            console.log(range);
            if (!range) {
                res.status(400).send("Requires Range header");
            }

            let fetched = await this.service.getVideo(JSON.parse(id));

            const videoPath = "./uploads/" + fetched[0]['file'];
            const videoSize = fs.statSync(videoPath).size;
            const CHUNK_SIZE = 10 ** 6; // 1MB
            const start = Number(range.replace(/\D/g, ""));
            console.log(start);
            const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
            const contentLength = end - start + 1;
            
            const responseHeader = {
                "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "video/mp4",
            };

            res.writeHead(206, responseHeader);
            const videoStream = fs.createReadStream(videoPath, { start, end });
            videoStream.pipe(res);
        } catch (error) {
            console.log(error);
        }
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
     * @returns reply object
     */
    @Delete('video')
    async deleteVideo(@Request() req){

        // TODO: Verify data against proper permissions
        //      - Uses headers
        //      - checks params
        console.log(req.query);
        console.log(req.headers);

        this.service.deleteVideo(req.query.id);

        // Replyies to the requester that the request was successfull
        return {type: "reply", code: "succes"};
    }
}
