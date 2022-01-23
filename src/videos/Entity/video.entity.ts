import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('number')
    file:string;

    @Column('name')
    name:string;

    @Column('likes')
    linkes:number;

    @Column('dislikes')
    dislikes: number;

    @Column('vip')
    vip:boolean;
}
