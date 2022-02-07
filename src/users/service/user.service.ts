import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private userRepository: Repository<User>){}

    /**
     * creates a user
     * @param user the user object as defined by User Entity Model
     * @returns true if successfull false if not
     */
    async createUser(user:User): Promise<boolean>{
        try {
            user["profile_id"] = Math.floor(Math.random() * 999999);
            await this.userRepository.save(user);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * gets a user identified by its registered email
     * @param _email the email to look for
     * @returns the object with user data or null if erroring
     */
    getUser(_email:string):Object | null{
        return this.userRepository.find({
            select:["id", "email","name","profile_likes","profile_pic","username"],
            where:[{"email":_email}]
        });
    }

    /**
     * gets a user by its user_id
     * @param _id the user id to look for
     * @returns the object with user data or null if erroring
     */
    getUserById(_id:number):Object | null{
        return this.userRepository.find({
            select:["id", "email","name","profile_likes","profile_pic","username"],
            where:[{"id":_id}]
        });
    }

    /**
     * fetches userdata by the username
     * @param _username the username used as identifier
     * @deprecated this function will be removed in favor if the userid function
     * @returns the object with user data or null if erroring
     */
    getUserbyName(_username:string):Object | null{
        return this.userRepository.find({
            select:["id", "email","name","profile_likes","profile_pic","username"],
            where:[{"username":_username}]
        }); 
    }

    /**
     * updates a user with specific data
     * @param _id the user id for the user to update
     * @param _changes the changes as json object
     * @returns true if changes were applied false if error occured
     */
    async updateUser(_id:number, _changes:object): Promise<Boolean>{
        try {
            this.userRepository.update(_id, _changes);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * deletes a user
     * @param user the users full dataobject
     * @deprecated this will be replaced by a better solution implementation of this will stop working in future
     * @returns true if removal was successfull false if errors occured
     */
    async deleteUser(user:User): Promise<boolean>{
        try {
            this.userRepository.delete(user);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * veryfies the users login attempt
     * @param _email the email used as identifier 
     * @param _password the password to validate
     * @returns true if user values are correct false if not
     */
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
