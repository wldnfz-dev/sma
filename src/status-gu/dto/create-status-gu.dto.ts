import { IsOptional, IsString, ValidateNested } from "class-validator";
import { OneToMany } from "typeorm";
import { StatusGu } from "../entities/status-gu.entity";
import { CreateGuDto } from "src/gu/dto/create-gu.dto";
import { Type } from "class-transformer";
import { OmitType, PickType } from "@nestjs/mapped-types";

export class StatusGuDto {
    @IsOptional()
    id?: number

    @IsOptional()
    @IsString()
    guId?: CreateGuDto

    @IsOptional()
    @IsString()
    status?: string
}
export class StatusGuDetail {
    @ValidateNested({ each: true })
    @Type(() => StatusGuDto)
    statusGu: StatusGuDto[];
}
export class CreateStatusGuDto extends OmitType(StatusGuDto, ['id']) {}
export class StatusGuIdDto extends PickType(StatusGuDto, ['id']) {}
