import { PartialType } from '@nestjs/mapped-types';
import { CreateHonorariumDto } from './create-honorarium.dto';

export class UpdateHonorariumDto extends PartialType(CreateHonorariumDto) {}
