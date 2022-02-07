import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Videos {
    
    @PrimaryGeneratedColumn()
    vid_id: number;

    @Column()
    file:string;

    @Column()
    name:string;

    @Column()
    likes:number;

    @Column()
    dislikes: number;

    @Column({default:false})
    vip:boolean;
}
