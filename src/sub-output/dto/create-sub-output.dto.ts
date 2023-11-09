import { OmitType, PickType } from "@nestjs/mapped-types";
import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { CreateOutputDto } from "src/output/dto/create-output.dto";

export class SubOutputDto {
    @IsOptional()
    id?: string

    @IsString()
    output: CreateOutputDto

    @IsString()
    subOutputCode: string

    @IsString()
    subOutput: string

    @IsNumber()
    year: number = new Date().getFullYear()
}
export class CreateSubOutputDto extends OmitType(SubOutputDto, ['id']) {}
export class SubOutputIdDto extends PickType(SubOutputDto, ['id']) {}
