import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Request, UploadedFile, ParseFilePipeBuilder, HttpException, HttpStatus, Res, InternalServerErrorException } from '@nestjs/common';
import { FilesService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import * as fs from 'fs';
import { Helper } from './helper';

@Controller('file')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: Helper.filePath,
        filename: Helper.customFileName
      }),
    })
  )
  @Roles('user', 'admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'pdf',
        })
        .addMaxSizeValidator({
          maxSize: 1000000,
        })
        .build({
          exceptionFactory(error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
          },
        }),
    ) files: Express.Multer.File
  ) {
    const createFileDto = new CreateFileDto();
    createFileDto.files = files
    createFileDto.filename = files.originalname
    try {
      let data = await this.filesService.create(createFileDto)
      const oldPath = `./files/file.pdf`;
      const newPath = `./files/${createFileDto.id} - ${createFileDto.filename}`;
      fs.renameSync(oldPath, newPath);

      createFileDto.filename = `${createFileDto.id} - ${createFileDto.filename}`
      await this.filesService.update(data.id, createFileDto)
    } catch (error) {
      return {
        status: "failed",
        data: createFileDto,
        message: error.message
      }
    }
    return {
      status: "success",
      data: createFileDto,
      message: "Data successfully saved"
    }
  }

  @Get()
  async findAll() {
    let data;
    try {
      data = await this.filesService.findAll();
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
  async file(@Param('id') id: string, @Res() res) {
    let data;
    try {
      data = await this.filesService.findOne(id);
    } catch (error) {
      return {
        status: "failed",
        data: {},
        message: error.message
      }
    }
    const file = `./files/${data.filename}`;
    return res.download(file);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}
