import { IsString, MaxLength, MinLength } from "class-validator"

export class CreateActivityDto {
    @IsString()
    @MinLength(4)
    @MaxLength(4)
    id: string

    @IsString()
    activity: string
}
