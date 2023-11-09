import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { HonorariumService } from './honorarium.service';
import { CreateHonorariumDto } from './dto/create-honorarium.dto';
import { UpdateHonorariumDto } from './dto/update-honorarium.dto';
import { customAlphabet } from 'nanoid';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)

@Controller('honorarium')
export class HonorariumController {
  constructor(private readonly honorariumService: HonorariumService) {}

  @Post()
  @Roles('user', 'admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(
    @Body() createHonorariumDto: CreateHonorariumDto,
    @Request() req: any,
  ) {
    let id = "HONOR-"+nanoid();
    createHonorariumDto.id = id
    createHonorariumDto.id_user = req.user.id_user
    createHonorariumDto.name = req.user.name
    createHonorariumDto.unit = req.user.unit
    createHonorariumDto.status = "process"

    try {
      await this.honorariumService.create(createHonorariumDto);
    } catch (error) {
      return {
        status: "failed",
        data: createHonorariumDto,
        message: error.message
      }
    }
    return {
      status: "success",
      data: createHonorariumDto,
      message: "Data successfully saved"
    }
  }

  @Get()
  async findAll() {
    let data;
    try {
      data = await this.honorariumService.findAll();
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
    let data = await this.honorariumService.findOne(id);
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
    @Body() updateHonorariumDto: UpdateHonorariumDto,
  ) {
    let data = await this.honorariumService.findOne(id);
    if(data === null){
      throw new HttpException({
        status: "failed",
        data: data,
        message: "Data not found"
      }, HttpStatus.NOT_FOUND);
    }
    try {
      await this.honorariumService.update(id, updateHonorariumDto);
    } catch (error) {
      return {
        status: "failed",
        data: {},
        message: error.message
      }
    }
    return {
      status: "success",
      data: updateHonorariumDto,
      message: "Data successfully updated"
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let data = await this.honorariumService.findOne(id);
    if(data === null){
      throw new HttpException({
        status: "failed",
        data: data,
        message: "Data not found"
      }, HttpStatus.NOT_FOUND);
    }
    try {
      data = await this.honorariumService.remove(id);
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
