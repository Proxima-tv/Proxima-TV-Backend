import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { CryptoService } from 'src/crypto/Service/crypto.service';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private service:UserService){}
    @Post('register')
    async registerUser(@Body() user:User){
        this.service.createUser(user);
    }

    @Get('login')
    async loginUser(@Body() body, @Request() req){
        console.log(JSON.parse(CryptoService.decrypt(body)));
        // get password hash from request body
        // get password hash from database
        // decrypt password
        // compare both
        // return user data and success code when logged in and error when not
        return {success:true, code:200};
    }

    @Post('update')
    async updateUser(@Body() user:User){
        this.service.updateUser(user);
    }
}
