import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Jaldi {
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
    sp: boolean

    @Column()    
    rab: boolean

    @Column()
    tiket_transport: boolean

    @Column()
    boarding_pass: boolean

    @Column()
    taksi: boolean

    @Column()
    kwitansi_hotel: boolean

    @Column()
    sppd_lembar_ii: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
