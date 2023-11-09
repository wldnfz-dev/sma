import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Honorarium {
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
    salinan_sk: boolean
    
    @Column()
    scan_ktp: boolean

    @Column()
    scan_npwp: boolean

    @Column()
    scan_rekening: boolean

    @Column()
    scan_daftar_hadir: boolean

    @Column()
    surat_keterangan: boolean

    @Column()
    laporan: boolean

    @Column()
    dokumentasi: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
