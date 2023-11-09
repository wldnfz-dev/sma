import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { GuService } from './gu.service';
import { CreateGuDto } from './dto/create-gu.dto';
import { UpdateGuDto } from './dto/update-gu.dto';
import { customAlphabet } from 'nanoid';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { StatusGuDetail } from 'src/status-gu/dto/create-status-gu.dto';
import { StatusGuService } from 'src/status-gu/status-gu.service';

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)

@Controller('gu')
export class GuController {
  constructor(
    private readonly guService: GuService,
    private readonly statusGuService: StatusGuService
  ) {}

  @Post()
  @Roles('USER', 'ADMIN_RENKEU')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(
    @Body() createGuDto: CreateGuDto,
    @Request() req: any,
    @Body() statusGuDetail: StatusGuDetail,
  ) {
    let id = "GU-"+nanoid();
    createGuDto.id = id
    createGuDto.id_user = req.user.id_user
    createGuDto.name = req.user.name
    createGuDto.unit = req.user.unit

    let data;
    try {
      await this.guService.create(createGuDto);
      data = {
        guId : createGuDto.id as any,
        status : "PROSES_RENKEU"
      };
      this.statusGuService.create(data as any);
    } catch (error) {
      return {
        status: "failed",
        data: createGuDto,
        message: error.message
      }
    }
    return {
      status: "success",
      data: createGuDto,
      message: "Data successfully saved"
    }
  }

  @Get()
  @Roles('USER', 'ADMIN_RENKEU', 'USER_RENKEU', 'USER_KABAKUM', 'USER_DIREKTUR', 'USER_PPK')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findAll(@Request() req: any) {
    let role = req.user.role
    let data;
    try {
      if(role == "USER"){ 
        data = await this.guService.findByUnit(req.user.unit);
      } else {
        data = await this.guService.findAll();
      }
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
  @Roles('USER', 'ADMIN_RENKEU', 'USER_RENKEU', 'USER_KABAKUM', 'USER_DIREKTUR', 'USER_PPK')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findOne(@Param('id') id: string, @Request() req: any) {
    let data = await this.guService.findOne(id);
    if(data == null || undefined){
      throw new HttpException({
        status: "failed",
        data: data,
        message: "Data not found"
      }, HttpStatus.NOT_FOUND);
    } else if(data.unit != req.user.unit && req.user.role == "USER") {
      throw new HttpException({
        status: "failed",
        data: [],
        message: "Forbidden data resource"
      }, HttpStatus.FORBIDDEN);
    }
    return {
      status: "success",
      data: data,
      message: "Data successfully loaded"
    }
  }

  @Post('approve/:id')
  @Roles('ADMIN_RENKEU', 'USER_KABAKUM', 'USER_DIREKTUR', 'USER_PPK')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async approve(
    @Param('id') id: string, 
    @Request() req: any,
  ) {
    let gu = await this.guService.findOne(id);
    if(gu == null || undefined){
      throw new HttpException({
        status: "failed",
        data: [],
        message: "Data not found"
      }, HttpStatus.NOT_FOUND);
    }
    console.log(gu)
    let approve;
    if(req.user.role == "ADMIN_RENKEU" && gu.status[gu.status.length-1].status == "PROSES_RENKEU") {
      approve = {
        guId : gu.id as any,
        status : "PROSES_KABAKUM"
      };
    } else if(req.user.role == "USER_KABAKUM" && gu.status[gu.status.length-1].status == "PROSES_KABAKUM") {
      approve = {
        guId : gu.id as any,
        status : "PROSES_DIREKTUR"
      };
    } else if(req.user.role == "USER_DIREKTUR" && gu.status[gu.status.length-1].status == "PROSES_DIREKTUR") {
      approve = {
        guId : gu.id as any,
        status : "PROSES_PPK"
      };
    } else if(req.user.role == "USER_PPK" && gu.status[gu.status.length-1].status == "PROSES_PPK"){
      approve = {
        guId : gu.id as any,
        status : "PROSES_KEU"
      };
    } else {
      throw new HttpException({
        status: "failed",
        data: [],
        message: "Forbidden action because data on other process"
      }, HttpStatus.FORBIDDEN);
    }
    try {
      this.statusGuService.create(approve as any);
    } catch (error) {
      return {
        status: "failed",
        data: {},
        message: error.message
      }
  }
    return {
      status: "success",
      data: approve,
      message: "Data successfully saved"
    }
  }

  @Post('reject/:id')
  @Roles('ADMIN_RENKEU', 'USER_KABAKUM', 'USER_DIREKTUR', 'USER_PPK')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async reject(
    @Param('id') id: string, 
    @Request() req: any,
  ) {
    let gu = await this.guService.findOne(id);
    if(gu == null || undefined){
      throw new HttpException({
        status: "failed",
        data: [],
        message: "Data not found"
      }, HttpStatus.NOT_FOUND);
    }
    let reject, action;
    if(req.user.role == "ADMIN_RENKEU" && gu.status[gu.status.length-1].status == "PROSES_RENKEU") {
      reject = {
        guId : gu.id as any,
        status : "REJECT_RENKEU"
      };
      action = {
        guId : gu.id as any,
        status : "PROSES_USER"
      };
      gu.isTrue = false
    } else if(req.user.role == "USER_KABAKUM" && gu.status[gu.status.length-1].status == "PROSES_KABAKUM") {
      reject = {
        guId : gu.id as any,
        status : "REJECT_KABAKUM"
      };
      action = {
        guId : gu.id as any,
        status : "PROSES_RENKEU"
      };
    } else if(req.user.role == "USER_DIREKTUR" && gu.status[gu.status.length-1].status == "PROSES_DIREKTUR") {
      reject = {
        guId : gu.id as any,
        status : "REJECT_DIREKTUR"
      };
      action = {
        guId : gu.id as any,
        status : "PROSES_RENKEU"
      };
    } else if(req.user.role == "USER_PPK" && gu.status[gu.status.length-1].status == "PROSES_PPK"){
      reject = {
        guId : gu.id as any,
        status : "REJECT_PPK"
      };
      action = {
        guId : gu.id as any,
        status : "PROSES_RENKEU"
      };
    } else {
      throw new HttpException({
        status: "failed",
        data: [],
        message: "Forbidden action because data on other process"
      }, HttpStatus.FORBIDDEN);
    }
    try {
      this.statusGuService.create(reject as any);
      this.statusGuService.create(action as any);
    } catch (error) {
      return {
        status: "failed",
        data: {},
        message: error.message
      }
    }
    return {
      status: "success",
      data: [],
      message: "Data successfully reject"
    }
  }

  @Patch(':id')
  @Roles('USER', 'ADMIN_RENKEU')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async update(
    @Param('id') id: string, 
    @Body() updateGuDto: UpdateGuDto,
    @Request() req: any
  ) {
    let data = await this.guService.findOne(id);
    if(data == null || undefined){
      throw new HttpException({
        status: "failed",
        data: data,
        message: "Data not found"
      }, HttpStatus.NOT_FOUND);
    }

    if(data.isTrue == true && req.user.role == "USER") {
      throw new HttpException({
        status: "failed",
        data: [],
        message: "Data cannot edit"
      }, HttpStatus.NOT_ACCEPTABLE);
    } else if(data.unit != req.user.unit && req.user.role == "USER") {
      throw new HttpException({
        status: "failed",
        data: [],
        message: "Forbidden data resource"
      }, HttpStatus.FORBIDDEN);
    }
    try {
      await this.guService.update(id, updateGuDto);
    } catch (error) {
      return {
        status: "failed",
        data: {},
        message: error.message
      }
    }
    return {
      status: "success",
      data: updateGuDto,
      message: "Data successfully updated"
    }
  }

  @Delete(':id')
  @Roles('USER', 'ADMIN_RENKEU')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async remove(@Param('id') id: string, @Request() req: any) {
    let data = await this.guService.findOne(id);
    if(data == null || undefined){
      throw new HttpException({
        status: "failed",
        data: data,
        message: "Data not found"
      }, HttpStatus.NOT_FOUND);
    }
    if(data.isTrue == true && req.user.role == "USER") {
      throw new HttpException({
        status: "failed",
        data: [],
        message: "Data cannot edit"
      }, HttpStatus.NOT_ACCEPTABLE);
    } else if(data.unit != req.user.unit && req.user.role == "USER") {
      throw new HttpException({
        status: "failed",
        data: [],
        message: "Forbidden data resource"
      }, HttpStatus.FORBIDDEN);
    }
    try {
      data = await this.guService.remove(id);
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
