import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({nullable:false})
    username: string;
    
    @Column({nullable:false})
    password: string;

    @Column({nullable:true})
    name: string;

    @Column({nullable:false, unique: true})
    email: string;

    @Column({nullable: false, default: 0})
    profile_likes: number;

    @Column({nullable:true, default: null})
    profile_pic: string;
    
    @Column({nullable:false})
    profile_id: number;
}
