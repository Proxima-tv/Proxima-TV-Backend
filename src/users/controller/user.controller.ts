import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { CryptoService } from 'src/crypto/Service/crypto.service';
import { WatchhistoryService } from 'src/watchhistory/service/watchhistory.service';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(
        private service:UserService,
        private watch:WatchhistoryService    
    ){}
    @Post('register')
    async registerUser(@Body() user){

        const uNameRes = this.service.getUserbyName(user.username);
        const emailRes = this.service.getUser(user.email);

        console.log(await uNameRes.valueOf.length);

        if(uNameRes.valueOf.length == 0 || emailRes.valueOf.length == 0 ) {
            this.service.createUser(user);
            return CryptoService.encrypt(JSON.stringify({success:true, code:200}));
        } else {
            return CryptoService.encrypt(JSON.stringify({success:false, code:"duplicating_user_or_email"}));
        }
    }

    @Get('login')
    async loginUser(@Body() body, @Request() req){
        console.log(body);
        console.log(JSON.parse(CryptoService.decrypt(body)));
        // get password hash from request body
        // get password hash from database
        // return user data and success code when logged in and error when not

        

        const user = JSON.parse(CryptoService.decrypt(body));
        if(await this.service.verifyPassword(user.email, user.password)) {
            let u = await this.service.getUser(user.email);
            console.log(u[0]['id']);
            this.watch.getHistory(u[0]['id']);
            return CryptoService.encrypt(JSON.stringify({success:true, code:200}));
        } else {
            return CryptoService.encrypt(JSON.stringify({success:false, code:"invalid_login"}));
        }
    }

    @Post('update')
    async updateUser(@Body() user:User){
        this.service.updateUser(user);
    }
}
