import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException, Req, HttpStatus, HttpException } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  // @Roles({ roles: ['admin'] })
  async create(@Body() id, @Body() createActivityDto: CreateActivityDto) {
    let data = await this.activityService.findOne(id);
    if(data == null){
      this.activityService.create(createActivityDto);
      return {
        statusCode : HttpStatus.CREATED,
        message : "Activity data successfully saved"
      }
    } else {
      throw new HttpException({
        statusCode : HttpStatus.BAD_REQUEST,
        message : "Activity data already exist"
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.activityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let data = await this.activityService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Activity data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      return data;
    }
  }

  @Patch(':id')
  // @Roles({ roles: ['admin'] })
  async update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    let data = await this.activityService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Activity data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      this.activityService.update(id, updateActivityDto);
      return {
        statusCode : HttpStatus.OK,
        message : "Activity data successfully updated"
      }
    }
  }

  @Delete(':id')
  // @Roles({ roles: ['admin'] })
  async remove(@Param('id') id: string) {
    let data = await this.activityService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Activity data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      this.activityService.remove(id);
      return {
        statusCode : HttpStatus.OK,
        message : "Activity data successfully deleted"
      }
    }
  }
}
