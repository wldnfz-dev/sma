import { IsOptional, IsString } from 'class-validator';
import { IsPdfFile } from '../file.validator'

export class CreateFileDto {
    @IsOptional()
    id?: string

    @IsPdfFile()
    files: Express.Multer.File;

    @IsOptional()
    filename?: string
}
