import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusGuService } from './status-gu.service';
import { CreateStatusGuDto } from './dto/create-status-gu.dto';
import { UpdateStatusGuDto } from './dto/update-status-gu.dto';

@Controller('status-gu')
export class StatusGuController {
  constructor(private readonly statusGuService: StatusGuService) {}

  @Post()
  create(@Body() createStatusGuDto: CreateStatusGuDto) {
    return this.statusGuService.create(createStatusGuDto);
  }

  @Get()
  findAll() {
    return this.statusGuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusGuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatusGuDto: UpdateStatusGuDto) {
    return this.statusGuService.update(+id, updateStatusGuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusGuService.remove(+id);
  }
}
