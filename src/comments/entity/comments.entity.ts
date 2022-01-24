import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: number;

    @Column()
    comment: string;

    @Column({default: 0})
    likes: number;

    @Column({default:0})
    dislkies:number;

    @Column()
    vid_id: number;
}
