import { Controller, Get, Request, Post, Query, UploadedFile, UseInterceptors, Delete, Body, StreamableFile, Response } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideosService } from '../Service/videos.service';
import { CryptoService } from '../../crypto/Service/crypto.service';
import { Video } from '../Entity/video.entity';
import { createReadStream, fstat } from 'node:fs';
import path, { join } from 'path';
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

        console.log(CryptoService.decrypt(CryptoService.encrypt('{type: "reply", payload: "placeholder"}')))
        return CryptoService.encrypt('{type: "reply", payload: "placeholder"}'); // returning = replying
    }

    @Get('video')
    getVideo(@Body() body, @Response({passthrough:true}) res, @Request() req): StreamableFile {
        // TODO Pull data from database

        // TODO: Verify data against proper permissions
        //      - Uses headers
        //      - checks params
        console.log(req.headers);
        
        const file = createReadStream('./uploads/' + body.video);
        return new StreamableFile(file) // returning = replying
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

        fs.rename(file.path, './uploads/'+ file.originalname, (err) => {if (err) throw err;});

        // TODO: Verify data against proper permissions
        //      - Uses headers
        //      - checks params
        //console.log(req.headers);

        //this.service.createVideo(video);

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
