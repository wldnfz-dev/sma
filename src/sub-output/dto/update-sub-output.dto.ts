import { PartialType } from '@nestjs/mapped-types';
import { CreateSubOutputDto, SubOutputDto } from './create-sub-output.dto';

export class UpdateSubOutputDto extends PartialType(SubOutputDto) {}
