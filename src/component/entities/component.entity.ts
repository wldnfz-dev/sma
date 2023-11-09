import { Output } from "src/output/entities/output.entity";
import { Pagu } from "src/pagu/entities/pagu.entity";
import { SubComponent } from "src/sub-component/entities/sub-component.entity";
import { SubOutput } from "src/sub-output/entities/sub-output.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("component", {
    orderBy: {
        componentCode: "ASC"
    }
})
export class Component {
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
    
    @Column()
    componentCode: string

    @Column()
    component: string

    @Column({ type: 'int' })
    year: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => SubComponent, subComponent => subComponent.id)
    subComponent: SubComponent[];

    @OneToMany(() => Pagu, pagu => pagu.id)
    pagu: Pagu[];
}
