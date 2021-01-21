import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne} from "typeorm";
import {User} from "./User"

@Entity()
export class Relationship {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    follower_id: string;

    @Column()
    followed_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, user=>user.relationships) 
    user: User;
}
