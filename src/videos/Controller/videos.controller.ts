import { Controller, Get, Request, Post, Query, UploadedFile, UseInterceptors, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideosService } from '../Service/videos.service';
import { CryptoService } from '../../crypto/Service/crypto.service';


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
    async getVideo(@Query() query, @Request() req) {
        // TODO Pull data from database

        // TODO: Verify data against proper permissions
        //      - Uses headers
        //      - checks params
        console.log(query);
        console.log(req.headers);
        
        return {type: "reply", payload: "placeholder"}; // returning = replying
    }

    /**
     * updloads files
     * @param file the file
     * @param query query gotten from request
     * @returns reply object
     */
    @Post('video')
    @UseInterceptors(FileInterceptor('file'))
    async postVideos(@UploadedFile() file: Express.Multer.File, @Query() query, @Request() req) {

        // TODO: get file from request and insert it after type checking into storage
        console.log(file);

        // TODO: Verify data against proper permissions
        //      - Uses headers
        //      - checks params
        console.log(query);
        console.log(req.headers);

        // Replyies to the requester that the request was successfull
        return {type: "reply", code: "succes"};
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
