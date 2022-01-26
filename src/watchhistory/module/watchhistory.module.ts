import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchhistoryEntity } from '../entities/watchhistory.entity';
import { WatchhistoryService } from '../service/watchhistory.service';

@Module({
    imports:[TypeOrmModule.forFeature([WatchhistoryEntity])],
    providers: [WatchhistoryService],
    exports: [TypeOrmModule]
})
export class WatchhistoryModule {}
