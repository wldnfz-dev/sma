import { Gu } from "src/gu/entities/gu.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StatusGu {
    @PrimaryGeneratedColumn('increment')
    id?: number

    @ManyToOne(() => Gu, gu => gu.status, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'guId', referencedColumnName: 'id' })
    @Column({ type: "varchar" })
    guId: Gu

    @Column()
    status: string

    @CreateDateColumn()
    created_at: Date
}
