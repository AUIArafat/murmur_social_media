import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import {Murmur} from "./Murmur"
import {Relationship} from "./Relationship"

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Murmur, (murmur) => murmur.user, {eager: true, cascade: true})
    murmurs: Murmur[];

    @OneToMany(() => Relationship, (relationship) => relationship.user, {eager: true, cascade: true})
    relationships: Relationship[];
}
