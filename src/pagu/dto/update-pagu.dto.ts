import { PartialType } from '@nestjs/mapped-types';
import { CreatePaguDto, PaguDto } from './create-pagu.dto';

export class UpdatePaguDto extends PartialType(PaguDto) {}
