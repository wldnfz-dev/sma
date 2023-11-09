import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { JaldisService } from './jaldis.service';
import { CreateJaldiDto } from './dto/create-jaldi.dto';
import { UpdateJaldiDto } from './dto/update-jaldi.dto';
import { customAlphabet } from 'nanoid';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)

@Controller('jaldis')
export class JaldisController {
  constructor(private readonly jaldisService: JaldisService) {}

  @Post()
  @Roles('user', 'admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(
    @Body() createJaldiDto: CreateJaldiDto,
    @Request() req: any,
  ) {
    let id = "JALDIS-"+nanoid();
    createJaldiDto.id = id
    createJaldiDto.id_user = req.user.id_user
    createJaldiDto.name = req.user.name
    createJaldiDto.unit = req.user.unit
    createJaldiDto.status = "process"

    try {
      await this.jaldisService.create(createJaldiDto);
    } catch (error) {
      return {
        status: "failed",
        data: createJaldiDto,
        message: error.message
      }
    }
    return {
      status: "success",
      data: createJaldiDto,
      message: "Data successfully saved"
    }
  }

  @Get()
  async findAll() {
    let data;
    try {
      data = await this.jaldisService.findAll();
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
    let data = await this.jaldisService.findOne(id);
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
    @Body() updateJaldiDto: UpdateJaldiDto,
  ) {
    let data = await this.jaldisService.findOne(id);
    if(data === null){
      throw new HttpException({
        status: "failed",
        data: data,
        message: "Data not found"
      }, HttpStatus.NOT_FOUND);
    }
    try {
      await this.jaldisService.update(id, updateJaldiDto);
    } catch (error) {
      return {
        status: "failed",
        data: {},
        message: error.message
      }
    }
    return {
      status: "success",
      data: updateJaldiDto,
      message: "Data successfully updated"
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let data = await this.jaldisService.findOne(id);
    if(data === null){
      throw new HttpException({
        status: "failed",
        data: data,
        message: "Data not found"
      }, HttpStatus.NOT_FOUND);
    }
    try {
      data = await this.jaldisService.remove(id);
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
