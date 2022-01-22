import { Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('videos')
export class VideosController {
    @Get('video')
    async getVideos() {
        return "hey"; // returning = replying
    }

    /**
     * updloads files
     * @param file the file
     * @param query query gottne from request
     * @returns reply object
     */
    @Post('video')
    @UseInterceptors(FileInterceptor('file'))
    async postVideos(@UploadedFile() file: Express.Multer.File, @Query() query) {

        // TODO: get file from request and insert it after type checking into storage
        console.log(file);

        // TODO: Verify data against proper permissions
        //      - Uses headers
        //      - checks params
        console.log(query);

        // Replyies to the requester that the request was successfull
        return {type: "reply", code: "succes"};
    }
}
