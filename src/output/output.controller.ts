import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { OutputService } from './output.service';
import { CreateOutputDto } from './dto/create-output.dto';
import { UpdateOutputDto } from './dto/update-output.dto';

@Controller('output')
export class OutputController {
  constructor(private readonly outputService: OutputService) {}

  @Post()
  // @Roles({ roles: ['admin'] })
  async create(@Body() id, @Body() createOutputDto: CreateOutputDto) {
    let data = await this.outputService.findOne(id);
    if(data == null){
      this.outputService.create(createOutputDto);
      return {
        statusCode : HttpStatus.CREATED,
        message : "Output data successfully saved"
      }
    } else {
      throw new HttpException({
        statusCode : HttpStatus.BAD_REQUEST,
        message : "Output data already exist"
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.outputService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let data = await this.outputService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Output data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      return data;
    }
  }

  @Patch(':id')
  // @Roles({ roles: ['admin'] })
  async update(@Param('id') id: string, @Body() updateOutputDto: UpdateOutputDto) {
    let data = await this.outputService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Output data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      this.outputService.update(id, updateOutputDto);
      return {
        statusCode : HttpStatus.OK,
        message : "Output data successfully updated"
      }
    }
  }

  @Delete(':id')
  // @Roles({ roles: ['admin'] })
  async remove(@Param('id') id: string) {
    let data = await this.outputService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Output data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      this.outputService.remove(id);
      return {
        statusCode : HttpStatus.OK,
        message : "Output data successfully deleted"
      }
    }
  }
}
