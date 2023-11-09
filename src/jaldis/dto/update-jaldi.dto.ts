import { PartialType } from '@nestjs/mapped-types';
import { CreateJaldiDto } from './create-jaldi.dto';

export class UpdateJaldiDto extends PartialType(CreateJaldiDto) {}
