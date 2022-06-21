import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/service/user.service';

@Injectable()
export class RoutAuthenticatorService {
    constructor(private userService: UserService){}

    /**
     * checks headers against either allowed or disallowed values
     * @param header the header object from the request
     * @returns true if allowed and false if disallowed
     */
    async checkHeader(header:object): Promise<object> {
        // Failsafe Check Validation for Header
        try {
            // Fetch userid Header
            if(header["userid"] != null) {
                if(header["platform"] != null) {
                    let user = await this.userService.getUserById(header["userid"]);
                    let platform = JSON.parse(header["platform"]);
                    
                    return {valid: true, conditions: {
                            user: {
                                exists: user != null,
                                id: user["id"] == header["userid"],
                                token: header["usertoken"] == "test"
                            },
                            platform: {
                                name: platform["name"] == "test",
                                hash: platform["hash"] == "test"
                            },
                            origin: {
                                web: header["origin"] == "http://localhost:4200",
                                electrom: header["origin"] == "electron_shit"
                            }
                        }
                    }
                } else {
                    return {valid:false};
                }
            } else {
                return {valid:false};
            }
        } catch (error) {
            console.log(error);
            return {valid:false};
        }        
    }
}
