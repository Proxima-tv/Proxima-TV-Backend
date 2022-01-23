import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    file:string;

    @Column()
    name:string;

    @Column()
    linkes:number;

    @Column()
    dislikes: number;

    @Column()
    vip:boolean;
}
