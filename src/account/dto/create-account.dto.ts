import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateAccountDto {
    @IsString()
    @MinLength(6)
    @MaxLength(6)
    id: string

    @IsString()
    account: string
}
