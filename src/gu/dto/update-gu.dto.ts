import { PartialType } from '@nestjs/mapped-types';
import { CreateGuDto } from './create-gu.dto';

export class UpdateGuDto extends PartialType(CreateGuDto) {}
