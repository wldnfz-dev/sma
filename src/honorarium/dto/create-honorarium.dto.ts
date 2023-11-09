import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateHonorariumDto {
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

    @IsOptional()
    @IsString()
    status?: string

    @IsString()
    files: string

    @IsBoolean()
    salinan_sk: boolean

    @IsBoolean()
    scan_ktp: boolean

    @IsBoolean()
    scan_npwp: boolean

    @IsBoolean()
    scan_rekening: boolean

    @IsBoolean()
    scan_daftar_hadir: boolean

    @IsBoolean()
    surat_keterangan: boolean

    @IsBoolean()
    laporan: boolean

    @IsBoolean()
    dokumentasi: boolean
}
