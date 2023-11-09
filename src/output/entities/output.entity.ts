import { Component } from "src/component/entities/component.entity";
import { Pagu } from "src/pagu/entities/pagu.entity";
import { SubComponent } from "src/sub-component/entities/sub-component.entity";
import { SubOutput } from "src/sub-output/entities/sub-output.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Output {
    @PrimaryColumn({unique: true})
    id: string

    @Column()
    output: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(() => SubOutput, subOutput => subOutput.id)
    subOutput: SubOutput[];

    @OneToMany(() => Component, component => component.id)
    component: Component[];

    @OneToMany(() => Pagu, pagu => pagu.id)
    pagu: Pagu[];
}
