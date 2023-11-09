import { PartialType } from '@nestjs/mapped-types';
import { SubComponentDto } from './create-sub-component.dto';

export class UpdateSubComponentDto extends PartialType(SubComponentDto) {}
