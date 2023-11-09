import { OmitType, PickType } from "@nestjs/mapped-types"
import { IsNumber, IsOptional, IsString } from "class-validator"
import { CreateAccountDto } from "src/account/dto/create-account.dto"
import { CreateActivityDto } from "src/activity/dto/create-activity.dto"
import { CreateComponentDto } from "src/component/dto/create-component.dto"
import { CreateOutputDto } from "src/output/dto/create-output.dto"
import { CreateSubComponentDto } from "src/sub-component/dto/create-sub-component.dto"
import { CreateSubOutputDto } from "src/sub-output/dto/create-sub-output.dto"
import { CreateUnitDto } from "src/unit/dto/create-unit.dto"

export class PaguDto {
    @IsOptional()
    id?: string

    @IsString()
    unit: CreateUnitDto

    @IsString()
    activity: CreateActivityDto

    @IsString()
    output: CreateOutputDto

    @IsString()
    subOutput: CreateSubOutputDto

    @IsString()
    component: CreateComponentDto

    @IsString()
    subComponent: CreateSubComponentDto

    @IsString()
    account: CreateAccountDto

    @IsNumber()
    pagu: string

    @IsNumber()
    realisasi: string

    @IsNumber()
    sisa: string

    @IsNumber()
    year: number

    @IsString()
    user: string
}
export class CreatePaguDto extends OmitType(PaguDto, ['id']) {}
export class PaguIdDto extends PickType(PaguDto, ['id']) {}