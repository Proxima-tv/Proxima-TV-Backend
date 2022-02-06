import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private userRepository: Repository<User>){}

    async createUser(user:User): Promise<boolean>{
        try {
            await this.userRepository.save(user);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    getUser(_email:string):Object | null{
        return this.userRepository.find({
            select:["id", "email","name","profile_likes","profile_pic","username"],
            where:[{"email":_email}]
        });
    }

    getUserById(_id:number):Object | null{
        return this.userRepository.find({
            select:["id", "email","name","profile_likes","profile_pic","username"],
            where:[{"id":_id}]
        });
    }

    getUserbyName(_username:string):Object | null{
        return this.userRepository.find({
            select:["id", "email","name","profile_likes","profile_pic","username"],
            where:[{"username":_username}]
        }); 
    }

    async updateUser(user:User): Promise<Boolean>{
        try {
            this.userRepository.update(user.id, user);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteUser(user:User): Promise<boolean>{
        try {
            this.userRepository.delete(user);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
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
