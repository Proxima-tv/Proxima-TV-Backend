import { Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Post('register')
    async registerUser(@Body user:User){

    }
}
