import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WatchhistoryEntity } from '../entities/watchhistory.entity';

@Injectable()
export class WatchhistoryService {
    constructor(@InjectRepository(WatchhistoryEntity)
    private watchrRepository: Repository<WatchhistoryEntity>){}

    async getHistory(_user:number): Promise<Object> {
        let videos = await this.watchrRepository.find({
            select: ["vid_id"],
            where: [{"user_id":_user}]
        });

        let v = await videos;

        console.log(v[0]);
        return null;
    }
}
