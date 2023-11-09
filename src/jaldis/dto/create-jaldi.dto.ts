import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateJaldiDto {
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
    sp: boolean

    @IsBoolean()
    rab: boolean

    @IsBoolean()
    tiket_transport: boolean

    @IsBoolean()
    boarding_pass: boolean

    @IsBoolean()
    taksi: boolean

    @IsBoolean()
    kwitansi_hotel: boolean

    @IsBoolean()
    sppd_lembar_ii: boolean
}
