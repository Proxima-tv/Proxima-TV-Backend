import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    @Column()
    username: string;
    
    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    profile_likes: number;

    @Column()
    profile_pic: Blob;
    
    @Column()
    profile_id: number;
}
