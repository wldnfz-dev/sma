import { OmitType, PickType } from "@nestjs/mapped-types"
import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { CreateOutputDto } from "src/output/dto/create-output.dto"
import { CreateSubOutputDto } from "src/sub-output/dto/create-sub-output.dto"

export class ComponentDto {
    @IsString()
    id?: string

    @IsString()
    output: CreateOutputDto

    @IsString()
    subOutput: CreateSubOutputDto

    @IsString()
    componentCode: string

    @IsString()
    component: string

    @IsNumber()
    year: number = new Date().getFullYear()
}
export class CreateComponentDto extends OmitType(ComponentDto, ['id']) {}
export class ComponentIdDto extends PickType(ComponentDto, ['id']) {}
