import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateLDto {
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
    nodin_kpa: boolean

    @IsBoolean()
    sph: boolean

    @IsBoolean()
    kwitansi_kpa: boolean

    @IsBoolean()
    scan_rekening: boolean

    @IsBoolean()
    scan_npwp: boolean

    @IsBoolean()
    sp: boolean
}
