import { StatusGu } from "src/status-gu/entities/status-gu.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Gu {
    @PrimaryColumn({unique: true})
    id?: string

    @Column()
    name: string

    @Column()
    id_user: string

    @Column()
    unit: string

    @Column()
    detail: string

    @Column({ type: 'bigint' })
    nominal: number

    @Column()
    kwitansi_kpa: boolean

    @Column()
    nota_pembelian: boolean

    @Column()
    undangan: string

    @Column()
    sp: string

    @Column()
    daftar_hadir: boolean

    @Column()
    daftar_penerima: boolean

    @Column()
    sph_brosur: boolean

    @Column()
    bukti_transfer: boolean

    @Column()
    tagihan_pembayaran: boolean

    @Column()
    npwp: boolean

    @Column()
    dokumentasi: boolean

    @Column()
    isTrue: boolean

    @OneToMany(() => StatusGu, statusGu => statusGu.guId)
    status: StatusGu[];

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
