import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity("articles")
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", {length: 255} ) title: string;

    @Column("text") body: string;

    @Column("varchar", {length: 100}) createdAt: string;

    @Column( "varchar", { length: 100 } ) readTime: string;

    @Column("varchar", {length: 255}) userId: string;

    // @Column( "varchar", { length: 100 }) author: string;    

    @Column("text", {array: true}) tags: string[];    

    @ManyToOne(() => User, user => user.articles)
    @JoinColumn({name: "userId"})
    author: string

}