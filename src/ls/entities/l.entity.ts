import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class L {
    @PrimaryColumn({unique: true})
    id: string

    @Column()
    id_mak: string

    @Column()
    id_user: string

    @Column()
    name: string

    @Column()
    unit: string

    @Column()
    detail: string
    
    @Column({ type: 'bigint' })
    nominal: number

    @Column()
    status: string

    @Column()
    files: string

    @Column()
    nodin_kpa: boolean
    
    @Column()
    sph: boolean

    @Column()
    kwitansi_kpa: boolean

    @Column()
    scan_rekening: boolean

    @Column()
    scan_npwp: boolean

    @Column()
    sp: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
