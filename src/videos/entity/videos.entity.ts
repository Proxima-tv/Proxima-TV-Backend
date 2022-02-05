import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class Videos {
    @PrimaryGeneratedColumn()
    vid_id:number;
    
    @Column({nullable:false})
    file: string;
    
    @Column({nullable:false})
    title: string;

    @Column({default: 0})
    likes: number;

    @Column({default: 0})
    dislikes: string;
    
    @Column({default: 0})
    premium: boolean;

    @Column({nullable:true})
    uploaded_on:string;

    @Column({default: 0})
    click:number;
}
