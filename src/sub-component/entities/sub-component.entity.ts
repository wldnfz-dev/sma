import { Component } from "src/component/entities/component.entity";
import { Output } from "src/output/entities/output.entity";
import { Pagu } from "src/pagu/entities/pagu.entity";
import { SubOutput } from "src/sub-output/entities/sub-output.entity";
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("sub_component", {
    orderBy: {
        subComponent: "ASC"
    }
})
export class SubComponent {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Output, output => output.id, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: 'output', referencedColumnName: 'id' })
    @Column({ type: "varchar" })
    output: Output

    @ManyToOne(() => SubOutput, subOutput => subOutput.id, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: 'subOutput', referencedColumnName: 'id' })
    @Column({ type: "varchar" })
    subOutput: SubOutput

    @ManyToOne(() => Component, component => component.id, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    @JoinColumn({ name: 'component', referencedColumnName: 'id' })
    @Column({ type: "varchar" })
    component: Component

    @Column()
    subComponent: string
    
    @Column()
    description: string

    @Column({ type: 'int' })
    year: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => Pagu, pagu => pagu.id)
    pagu: Pagu[];
}
