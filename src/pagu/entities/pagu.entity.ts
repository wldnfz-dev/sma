import { Account } from "src/account/entities/account.entity";
import { Activity } from "src/activity/entities/activity.entity";
import { Component } from "src/component/entities/component.entity";
import { Output } from "src/output/entities/output.entity";
import { SubComponent } from "src/sub-component/entities/sub-component.entity";
import { SubOutput } from "src/sub-output/entities/sub-output.entity";
import { Unit } from "src/unit/entities/unit.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Pagu {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Unit, unit => unit.id, { onDelete: 'CASCADE', onUpdate: "CASCADE" })
    @JoinColumn({ name: 'unit', referencedColumnName: 'id' })
    @Column({ type: "varchar" })
    unit: Unit

    @ManyToOne(() => Activity, activity => activity.id, { onDelete: 'CASCADE', onUpdate: "CASCADE" })
    @JoinColumn({ name: 'activity', referencedColumnName: 'id' })
    @Column({ type: "varchar" })
    activity: Activity

    @ManyToOne(() => Output, output => output.id, { onDelete: 'CASCADE', onUpdate: "CASCADE" })
    @JoinColumn({ name: 'output', referencedColumnName: 'id' })
    @Column({ type: "varchar" })
    output: Output

    @ManyToOne(() => SubOutput, subOutput => subOutput.id, { onDelete: 'CASCADE', onUpdate: "CASCADE" })
    @JoinColumn({ name: 'subOutput', referencedColumnName: 'id' })
    @Column({ type: "varchar" })
    subOutput: SubOutput

    @ManyToOne(() => Component, component => component.id, { onDelete: 'CASCADE', onUpdate: "CASCADE" })
    @JoinColumn({ name: 'component', referencedColumnName: 'id' })
    @Column({ type: "varchar" })
    component: Component

    @ManyToOne(() => SubComponent, subComponent => subComponent.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'subComponent', referencedColumnName: 'id' })
    @Column({ type: "varchar" })
    subComponent: SubComponent

    @ManyToOne(() => Account, account => account.id, { onDelete: 'CASCADE', onUpdate: "CASCADE" })
    @JoinColumn({ name: 'account', referencedColumnName: 'id' })
    @Column({ type: "varchar" })
    account: Account

    @Column({ type: 'bigint' })
    pagu: string

    @Column({ type: 'bigint' })
    realisasi: string

    @Column({ type: 'bigint' })
    sisa: string

    @Column({ type: 'int' })
    year: number

    @Column()
    user: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
