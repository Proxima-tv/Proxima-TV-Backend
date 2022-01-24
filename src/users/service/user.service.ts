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

    async getUser(_id:number){
        this.userRepository.find({
            select:["email","name","profile_likes","profile_pic","username"],
            where:[{"id":_id}]
        });
    }

    async getPassword(_id:number){
        this.userRepository.find({
            select:['password'],
            where:[{"id":_id}]
        });
    }

    async updateUser(user:User){
        this.userRepository.save(user);
    }

    async deleteUser(user:User){
        this.userRepository.delete(user);
    }
}
