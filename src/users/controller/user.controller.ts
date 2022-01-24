import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private service:UserService){}
    @Post('register')
    async registerUser(@Body() user:User){
        this.service.createUser(user);
    }

    @Post('login')
    async loginUser(@Body() body, @Request() req){
        console.log(body);
    }

    @Post('update')
    async updateUser(@Body() user:User){
        this.service.updateUser(user);
    }
}
