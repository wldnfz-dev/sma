import { IsDate, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { CreateDateColumn } from "typeorm";

export class CreateAuthDto {
    @IsOptional()
    @IsString()
    id?: number

    @IsString()
    @IsOptional()
    jwt_token?: string

    @IsOptional()
    @IsString()
    email?: string

    @IsOptional()
    @IsDate()
    expired_at?: Date
}