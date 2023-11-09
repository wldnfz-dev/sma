import { PartialType } from '@nestjs/mapped-types';
import { ComponentDto, CreateComponentDto } from './create-component.dto';

export class UpdateComponentDto extends PartialType(ComponentDto) {}
