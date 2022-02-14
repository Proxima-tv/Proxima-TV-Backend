import { Body, Controller, Get, Post, Request } from '@nestjs/common';
<<<<<<< HEAD
import { request } from 'http';
import { RoutAuthenticatorService } from 'src/rout-authenticator/rout-authenticator.service';
=======
import { CryptoService } from 'src/crypto/Service/crypto.service';
>>>>>>> 6ae145fd541bbcc986e4f127e5e609aab8df560c
import { WatchhistoryService } from 'src/watchhistory/service/watchhistory.service';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(
        private service:UserService,
        private watch:WatchhistoryService,
        private routeAuth: RoutAuthenticatorService  
    ){}
    @Post('register')
    async registerUser(@Body() user){

        const uNameRes = this.service.getUserbyName(user.username);
        const emailRes = this.service.getUser(user.email);

        console.log(await uNameRes.valueOf.length);

        if(uNameRes.valueOf.length == 0 || emailRes.valueOf.length == 0 ) {
            this.service.createUser(user);
            return {success:true, code:200};
        } else {
            return {success:false, code:"duplicating_user_or_email"};
        }
    }
    @Get('settings')
        async getSettings(@Request() req){
            
            console.log(req.query);
            let json = req.query;
            let user = JSON.parse(json["user"])["email"];
            console.log(user);
            return await this.service.getsettings(user);
        }
    @Get('login')
    async loginUser(@Request() req){
        console.log(req.query);
        // get password hash from request body
        // get password hash from database
        // return user data and success code when logged in and error when not

<<<<<<< HEAD
        return this.routeAuth.checkHeader(req.headers);
=======
        

>>>>>>> 6ae145fd541bbcc986e4f127e5e609aab8df560c
        const user = JSON.parse(req.query['user']);
        if(await this.service.verifyPassword(user.email, user.password)) {
            let u = await this.service.getUser(user.email);
            console.log(u[0]['id']);
            //this.watch.getHistory(u[0]['id']);
            return {success:true, payload: {
                username: u[0]['username'],
                email: u[0]['email'],
                id: u[0]['id']
            }};
        } else {
            return {success:false, code:"invalid_login"};
        }
    }

    @Post('update')
    async updateUser(@Body() user:User){
        this.service.updateUser(user);
    }
}
