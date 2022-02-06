import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    username: string;
    
    @Column()
    password: string;

    @Column({nullable:true})
    name: string;

    @Column()
    email: string;

    @Column()
    profile_likes: number;

    @Column()
    profile_pic: string;
    
    @Column()
    profile_id: number;

    @Column()
    profile_bio: string ; 

    @Column()
    profile_public: number;

    @Column()
    public_stats: number;
   
    @Column()
    public_watchhistory: number;

    @Column()
    sub_newsletter: number;
   


   


    




}
