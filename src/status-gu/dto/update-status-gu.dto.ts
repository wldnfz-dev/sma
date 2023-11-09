import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusGuDto, StatusGuDto } from './create-status-gu.dto';

export class UpdateStatusGuDto extends PartialType(StatusGuDto) {}
