import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class WatchhistoryEntity {
    @PrimaryColumn()
    user_id:number;

    @Column()
    vid_id:number;
}
