import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { LsService } from './ls.service';
import { CreateLDto } from './dto/create-l.dto';
import { UpdateLDto } from './dto/update-l.dto';
import { customAlphabet } from 'nanoid';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)

@Controller('ls')
export class LsController {
  constructor(private readonly lsService: LsService) {}

  @Post()
  @Roles('user', 'admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(
    @Body() createLDto: CreateLDto,
    @Request() req: any,
  ) {
    let id = "LS-"+nanoid();
    createLDto.id = id
    createLDto.id_user = req.user.id_user
    createLDto.name = req.user.name
    createLDto.unit = req.user.unit
    createLDto.status = "process"

    try {
      await this.lsService.create(createLDto);
    } catch (error) {
      return {
        status: "failed",
        data: createLDto,
        message: error.message
      }
    }
    return {
      status: "success",
      data: createLDto,
      message: "Data successfully saved"
    }
  }

  @Get()
  async findAll() {
    let data;
    try {
      data = await this.lsService.findAll();
    } catch (error) {
      return {
        status: "failed",
        data: {},
        message: error.message
      }
    }
    return {
      status: "success",
      data: data,
      message: "Data successfully loaded"
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let data = await this.lsService.findOne(id);
    if(data === null){
      throw new HttpException({
        status: "failed",
        data: data,
        message: "Data not found"
      }, HttpStatus.NOT_FOUND);
    }
    return {
      status: "success",
      data: data,
      message: "Data successfully loaded"
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateLDto: UpdateLDto,
  ) {
    let data = await this.lsService.findOne(id);
    if(data === null){
      throw new HttpException({
        status: "failed",
        data: data,
        message: "Data not found"
      }, HttpStatus.NOT_FOUND);
    }
    try {
      await this.lsService.update(id, updateLDto);
    } catch (error) {
      return {
        status: "failed",
        data: {},
        message: error.message
      }
    }
    return {
      status: "success",
      data: updateLDto,
      message: "Data successfully updated"
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let data = await this.lsService.findOne(id);
    if(data === null){
      throw new HttpException({
        status: "failed",
        data: data,
        message: "Data not found"
      }, HttpStatus.NOT_FOUND);
    }
    try {
      data = await this.lsService.remove(id);
    } catch (error) {
      return {
        status: "failed",
        data: {},
        message: error.message
      }
    }
    return {
      status: "success",
      data: data,
      message: "Data successfully deleted"
    }
  }
}
