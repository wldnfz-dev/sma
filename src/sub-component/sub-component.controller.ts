import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, BadRequestException, InternalServerErrorException, Query } from '@nestjs/common';
import { SubComponentService } from './sub-component.service';
import { CreateSubComponentDto } from './dto/create-sub-component.dto';
import { UpdateSubComponentDto } from './dto/update-sub-component.dto';
import { SubOutputService } from 'src/sub-output/sub-output.service';
import { ComponentService } from 'src/component/component.service';

@Controller('sub-component')
export class SubComponentController {
  constructor(
    private readonly subOutputService: SubOutputService,
    private readonly componentService: ComponentService,
    private readonly subComponentService: SubComponentService
  ) {}

  @Post()
  // @Roles({ roles: ['admin'] })
  async create(@Body() id, @Body() createSubComponentDto: CreateSubComponentDto) {
    let subOutput = await this.subOutputService.findByOutputSubOutputCode(createSubComponentDto.output, createSubComponentDto.subOutput);
    if(subOutput == null) {
      throw new BadRequestException;
    }
    let component = await this.componentService.findComponentByOutputSubOutputCode(createSubComponentDto.output, subOutput.id, createSubComponentDto.component);
    if(component == null) {
      throw new BadRequestException;
    }
    let data = await this.subComponentService.findSubComponentByOutputSubOutputComponent(createSubComponentDto.output, subOutput.id, component.id, createSubComponentDto.subComponent)
    if(data == null) {
      try {
        createSubComponentDto.subOutput = subOutput.id as any
        createSubComponentDto.component = component.id as any
        this.subComponentService.create(createSubComponentDto);
        return {
          statusCode : HttpStatus.CREATED,
          message : "Sub component data successfully saved"
        }
      } catch(error) {
        throw new InternalServerErrorException;
      }
    } else {
      throw new HttpException({
        statusCode : HttpStatus.BAD_REQUEST,
        message : "Sub component data already exist"
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.subComponentService.findAll();
  }

  @Get('filter?')
  async findByFilter(
    @Query('start') start: number,
    @Query('limit') limit: number,
  ) {
    return this.subComponentService.findByFilter(start, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let data = await this.subComponentService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Sub component data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      return data;
    }
  }

  @Patch(':id')
  // @Roles({ roles: ['admin'] })
  async update(@Param('id') id: string, @Body() updateSubComponentDto: UpdateSubComponentDto) {
    let data = await this.subComponentService.findOne(id);
    let subOutput = await this.subOutputService.findByOutputSubOutputCode(updateSubComponentDto.output, updateSubComponentDto.subOutput);
    if(subOutput == null) {
      throw new BadRequestException;
    } 
    let component = await this.componentService.findComponentByOutputSubOutputCode(updateSubComponentDto.output, subOutput.id, updateSubComponentDto.component);
    if(component == null) {
      throw new BadRequestException;
    } 
    let subComponent = await this.subComponentService.findSubComponentByOutputSubOutputComponent(updateSubComponentDto.output, subOutput.id, component.id, updateSubComponentDto.subComponent)
    if(data == null) {
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Sub component data not found"
      }, HttpStatus.NOT_FOUND);
    } else if(subComponent != null) {
      if(id != subComponent.id && subComponent != null) {
        throw new HttpException({
          statusCode : HttpStatus.BAD_REQUEST,
          message : "Sub component data already exist"
        }, HttpStatus.BAD_REQUEST);
      } else {
        updateSubComponentDto.subOutput = subOutput.id as any
        updateSubComponentDto.component = component.id as any
        this.subComponentService.update(id, updateSubComponentDto);
        return {
          statusCode : HttpStatus.OK,
          message : "Sub component data successfully updated"
        } 
      }
    } else {
      updateSubComponentDto.subOutput = subOutput.id as any
      updateSubComponentDto.component = component.id as any
      this.subComponentService.update(id, updateSubComponentDto);
      return {
        statusCode : HttpStatus.OK,
        message : "Sub component data successfully updated"
      } 
    }
  }

  @Delete(':id')
  // @Roles({ roles: ['admin'] })
  async remove(@Param('id') id: string) {
    let data = await this.subComponentService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Sub component data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      this.subComponentService.remove(id);
      return {
        statusCode : HttpStatus.OK,
        message : "Sub component data successfully deleted"
      }
    }
  }
}
