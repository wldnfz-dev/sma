import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ComponentService } from './component.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { SubOutputService } from 'src/sub-output/sub-output.service';

@Controller('component')
export class ComponentController {
  constructor(
    private readonly componentService: ComponentService,
    private readonly subOutputService: SubOutputService
  ) {}

  @Post()
  // @Roles({ roles: ['admin'] })
  async create(@Body() id, @Body() createComponentDto: CreateComponentDto) {
    let subOutput = await this.subOutputService.findByOutputSubOutputCode(createComponentDto.output, createComponentDto.subOutput);
    if(subOutput == null) {
      throw new BadRequestException;
    }
    let data = await this.componentService.findComponentByOutputSubOutputCode(createComponentDto.output, subOutput.id, createComponentDto.componentCode);
    if(data == null) {
      try {
        createComponentDto.subOutput = subOutput.id as any
        this.componentService.create(createComponentDto);
        return {
          statusCode : HttpStatus.CREATED,
          message : "Component data successfully saved"
        }
      } catch (error) {
        throw new BadRequestException
      }
    } else {
      throw new HttpException({
        statusCode : HttpStatus.BAD_REQUEST,
        message : "Component data already exist"
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.componentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let data = await this.componentService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Component data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      return data;
    }
  }

  @Patch(':id')
  // @Roles({ roles: ['admin'] })
  async update(@Param('id') id: string, @Body() updateComponentDto: UpdateComponentDto) {
    let data = await this.componentService.findOne(id);
    let subOutput = await this.subOutputService.findByOutputSubOutputCode(updateComponentDto.output, updateComponentDto.subOutput);
    if(subOutput == null) {
      throw new BadRequestException;
    } 
    let component = await this.componentService.findComponentByOutputSubOutputCode(updateComponentDto.output, subOutput.id, updateComponentDto.componentCode);
    if(data == null) {
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Component data not found"
      }, HttpStatus.NOT_FOUND);
    } else if(component != null) {
      if(id != component.id && component != null) {
        throw new HttpException({
          statusCode : HttpStatus.BAD_REQUEST,
          message : "Component data already exist"
        }, HttpStatus.BAD_REQUEST);
      } else {
        updateComponentDto.subOutput = subOutput.id as any
        this.componentService.update(id, updateComponentDto);
        return {
          statusCode : HttpStatus.OK,
          message : "Component data successfully updated"
        } 
      }
    } else {
      updateComponentDto.subOutput = subOutput.id as any
      this.componentService.update(id, updateComponentDto);
      return {
        statusCode : HttpStatus.OK,
        message : "Component data successfully updated"
      } 
    }
  }

  @Delete(':id')
  // @Roles({ roles: ['admin'] })
  async remove(@Param('id') id: string) {
    let data = await this.componentService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Component data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      this.componentService.remove(id);
      return {
        statusCode : HttpStatus.OK,
        message : "Component data successfully deleted"
      }
    }
  }
}
