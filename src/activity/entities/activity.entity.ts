import { Pagu } from "src/pagu/entities/pagu.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Activity {
    @PrimaryColumn({unique: true})
    id: string

    @Column()
    activity: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Pagu, pagu => pagu.id)
    pagu: Pagu[];
}
