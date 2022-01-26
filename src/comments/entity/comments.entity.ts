import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    com_id: number;

    @Column()
    author: number;

    @Column()
    comment: string;

    @Column({default: 0})
    video: string;

    @Column({default:0})
    profile_id:number;

    @Column()
    vid_id: number;

    @Column()
    commented_on: string;
}
