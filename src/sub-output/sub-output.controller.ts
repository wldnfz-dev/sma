import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { SubOutputService } from './sub-output.service';
import { CreateSubOutputDto } from './dto/create-sub-output.dto';
import { UpdateSubOutputDto } from './dto/update-sub-output.dto';

@Controller('sub-output')
export class SubOutputController {
  constructor(private readonly subOutputService: SubOutputService) {}

  @Post()
  // @Roles({ roles: ['admin'] })
  async create(@Body() id, @Body() createSubOutputDto: CreateSubOutputDto) {
    let data = await this.subOutputService.findByOutputSubOutputCode(createSubOutputDto.output, createSubOutputDto.subOutputCode);
    if(data == null){
      this.subOutputService.create(createSubOutputDto);
      return {
        statusCode : HttpStatus.CREATED,
        message : "Sub output data successfully saved"
      }
    } else {
      throw new HttpException({
        statusCode : HttpStatus.BAD_REQUEST,
        message : "Sub output data already exist"
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.subOutputService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let data = await this.subOutputService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Sub output data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      return data;
    }
  }

  @Patch(':id')
  // @Roles({ roles: ['admin'] })
  async update(@Param('id') id: string, @Body() updateSubOutputDto: UpdateSubOutputDto) {
    let data = await this.subOutputService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Sub output data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      this.subOutputService.update(id, updateSubOutputDto);
      return {
        statusCode : HttpStatus.OK,
        message : "Sub output data successfully updated"
      }
    }
  }

  @Delete(':id')
  // @Roles({ roles: ['admin'] })
  async remove(@Param('id') id: string) {
    let data = await this.subOutputService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Sub output data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      this.subOutputService.remove(id);
      return {
        statusCode : HttpStatus.OK,
        message : "Sub output data successfully deleted"
      }
    }
  }
}
