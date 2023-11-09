import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  // @Roles({ roles: ['admin'] })
  async create(@Body() id, @Body() createUnitDto: CreateUnitDto) {
    let data = await this.unitService.findOne(id);
    if(data == null){
      this.unitService.create(createUnitDto);
      return {
        statusCode : HttpStatus.CREATED,
        message : "Unit data successfully saved"
      }
    } else {
      throw new HttpException({
        statusCode : HttpStatus.BAD_REQUEST,
        message : "Unit data already exist"
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.unitService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let data = await this.unitService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Unit data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      return data;
    }
  }

  @Patch(':id')
  // @Roles({ roles: ['admin'] })
  async update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
    let data = await this.unitService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Unit data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      this.unitService.update(id, updateUnitDto);
      return {
        statusCode : HttpStatus.OK,
        message : "Unit data successfully updated"
      }
    }
  }

  @Delete(':id')
  // @Roles({ roles: ['admin'] })
  async remove(@Param('id') id: string) {
    let data = await this.unitService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Unit data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      this.unitService.remove(id);
      return {
        statusCode : HttpStatus.OK,
        message : "Unit data successfully deleted"
      }
    }
  }
}
