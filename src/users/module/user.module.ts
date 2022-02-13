import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutAuthenticatorService } from 'src/rout-authenticator/rout-authenticator.service';
import { WatchhistoryModule } from 'src/watchhistory/module/watchhistory.module';
import { WatchhistoryService } from 'src/watchhistory/service/watchhistory.service';
import { UserController } from '../controller/user.controller';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';

@Module({
    imports:[TypeOrmModule.forFeature([User]), WatchhistoryModule],
    providers: [UserService, WatchhistoryService,RoutAuthenticatorService],
    controllers: [UserController],
    exports: [TypeOrmModule]
})
export class UserModule {}
