import { IsBoolean, IsOptional, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {
    @IsOptional()
    id?: string

    @IsString()
    name: string

    @IsString()
    email: string

    @IsOptional()
    @IsString()
    @MinLength(10)
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password?: string

    @IsString()
    role: string

    @IsString()
    nip: string

    @IsString()
    jabatan: string

    @IsString()
    unit: string

    @IsOptional()
    @IsBoolean()
    is_active?: boolean

    @IsOptional()
    @IsString()
    verification_code?: string
}
