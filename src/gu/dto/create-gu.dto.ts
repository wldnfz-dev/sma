import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateGuDto {
    @IsOptional()
    id?: string

    @IsString()
    id_mak: string

    @IsOptional()
    @IsString()
    id_user?: string

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    unit?: string

    @IsString()
    detail: string

    @IsNumber()
    nominal: number

    @IsBoolean()
    kwitansi_kpa: boolean

    @IsBoolean()
    nota_pembelian: boolean

    @IsString()
    undangan: string

    @IsString()
    sp: string

    @IsBoolean()
    daftar_hadir: boolean

    @IsBoolean()
    daftar_penerima: boolean

    @IsBoolean()
    sph_brosur: boolean

    @IsBoolean()
    bukti_transfer: boolean

    @IsBoolean()
    tagihan_pembayaran: boolean

    @IsBoolean()
    npwp: boolean

    @IsBoolean()
    dokumentasi: boolean

    @IsBoolean()
    isTrue: boolean
}
