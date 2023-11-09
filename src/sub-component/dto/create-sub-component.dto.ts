import { OmitType, PickType } from "@nestjs/mapped-types"
import { IsNumber, IsObject, IsOptional, IsString } from "class-validator"
import { CreateOutputDto } from "src/output/dto/create-output.dto"
import { CreateSubOutputDto } from "src/sub-output/dto/create-sub-output.dto"
import { CreateComponentDto } from "src/component/dto/create-component.dto"

export class SubComponentDto {
    @IsOptional()
    id?: string

    @IsString()
    output: CreateOutputDto

    @IsString()
    subOutput: CreateSubOutputDto

    @IsString()
    component: CreateComponentDto

    @IsString()
    subComponent: string

    @IsString()
    description: string

    @IsNumber()
    year: number = new Date().getFullYear()
}
export class CreateSubComponentDto extends OmitType(SubComponentDto, ['id']) {}
export class SubComponentIdDto extends PickType(SubComponentDto, ['id']) {}
