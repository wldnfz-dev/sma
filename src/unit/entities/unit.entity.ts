import { Pagu } from "src/pagu/entities/pagu.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Unit {
    @PrimaryColumn({unique: true})
    id: string

    @Column({unique: true})
    organizationId: string
    
    @Column({unique: true})
    agencyId: string

    @Column({unique: true})
    programId: string

    @Column()
    unit: string

    @Column()
    program: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at : Date

    @OneToMany(() => Pagu, pagu => pagu.id)
    pagu: Pagu[];
}
