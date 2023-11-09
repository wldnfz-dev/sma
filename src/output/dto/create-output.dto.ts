import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateOutputDto {
    @IsString()
    @MinLength(3)
    @MaxLength(3)
    id: string

    @IsString()
    output: string
}
