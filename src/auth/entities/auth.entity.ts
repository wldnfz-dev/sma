import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auth {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    email: string

    @Column('text')
    jwt_token: string

    @CreateDateColumn()
    created_at: Date

    @Column()
    expired_at: Date
}
