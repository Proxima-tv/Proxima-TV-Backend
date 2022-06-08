import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private userRepository: Repository<User>){}

    async createUser(user:User){
        await this.userRepository.save(user);
    }

    async getUser(_email:string):Promise<object>{
        return await this.userRepository.find({
            select:["id", "email","name","profile_likes","profile_pic","username"],
            where:[{"email":_email}]
        });
    }

    async getUserById(_id:number):Promise<object>{
        return await this.userRepository.find({
            select:["id", "email","name","profile_likes","profile_pic","username"],
            where:[{"id":_id}]
        });
    }

    async getUserbyName(_username:string):Promise<Object>{
        return await this.userRepository.find({
            select:["id", "email","name","profile_likes","profile_pic","username"],
            where:[{"username":_username}]
        }); 
    }

    async getsettings(_email:string):Promise<object>{
        return await this.userRepository.find({
            select:["id", "email","name","profile_bio","profile_pic","username"],
            where:[{"email":_email}]
        })
    }

    async updateUser(user:User){
        this.userRepository.save(user);
    }

    async deleteUser(user:User){
        this.userRepository.delete(user);
    }

    async verifyPassword(_email:string, _password):Promise<boolean> {
        console.log("email: " + _email);
        console.log(_password);
        const password = await this.userRepository.find({
            select:["password"],
            where:[{"email":_email}]
        });

        console.log(password[0]['password'] == _password);

        return password[0]['password'] == _password;
    }
}
