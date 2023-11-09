import { Output } from "src/output/entities/output.entity";
import { Pagu } from "src/pagu/entities/pagu.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("sub_output", {
    orderBy: {
        subOutputCode: "ASC"
    }
})
export class SubOutput {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Output, output => output.id, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: 'output', referencedColumnName: 'id' })
    @Column({ type: "varchar" })
    output: Output

    @Column()
    subOutputCode: string

    @Column()
    subOutput: string

    @Column({ type: 'int' })
    year: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Pagu, pagu => pagu.id)
    pagu: Pagu[];
}
