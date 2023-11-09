import { PartialType } from '@nestjs/mapped-types';
import { CreateLDto } from './create-l.dto';

export class UpdateLDto extends PartialType(CreateLDto) {}
