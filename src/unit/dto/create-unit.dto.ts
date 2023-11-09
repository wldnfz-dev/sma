import { IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class CreateUnitDto {
    @IsString()
    id: string

    @IsString()
    organizationId: string
    
    @IsString()
    agencyId: string

    @IsString()
    @MinLength(2)
    @MaxLength(2)
    programId: string

    @IsString()
    unit: string

    @IsString()
    program: string
}
