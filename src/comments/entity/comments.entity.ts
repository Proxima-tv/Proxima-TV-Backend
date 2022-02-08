import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    com_id: number;

    @Column({nullable:false})
    author: number;

    @Column({nullable:false})
    comment: string;

    @Column({default: 0})
    video: string;

    @Column({default:0})
    profile_id:number;

    @Column({nullable:false})
    vid_id: number;

    @Column({default: Date.now().toLocaleString()})
    commented_on: string;
}
