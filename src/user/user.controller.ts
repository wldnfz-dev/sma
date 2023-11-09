import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, Query, DefaultValuePipe, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { customAlphabet } from 'nanoid';
import { MailService } from 'src/mail/mail.service';

const nanoid_password = customAlphabet(`1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ-=,;[.'];',./_+{}:"<>?`, 8)
const nanoid_verification_code = customAlphabet(`1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`, 16)

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {}

  @Post()
  @Roles('ADMIN_RENKEU')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    createUserDto.password = nanoid_password()
    let temp_password = createUserDto.password
    createUserDto.is_active = false
    createUserDto.verification_code = nanoid_verification_code()
    try {
      await this.userService.create(createUserDto);
      await this.mailService.sendVerificationEmail(createUserDto.name, createUserDto.email, createUserDto.role, temp_password, createUserDto.verification_code)
    } catch (error) {
      return {
        status: "failed",
        data: createUserDto,
        message: error.message
      }
    }
    delete createUserDto['password']
    delete createUserDto['verification_code']
    return {
      status: "success",
      data: createUserDto,
      message: "Data successfully saved"
    }
  }

  @Post('verification?')
  async verificationUser(
    @Query('verification_code', new DefaultValuePipe('')) verification_code: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    let data = await this.userService.findProfile(updateUserDto.email)
    if(data == null || undefined){
      throw new HttpException({
        status: "failed",
        data: [],
        message: "Account not found"
      }, HttpStatus.NOT_FOUND);
    }
    updateUserDto.is_active = true
    if(data.verification_code === verification_code) {
      try {
        await this.userService.update(data.id, updateUserDto);
      } catch (error) {
        return {
          status: "failed",
          data: data,
          message: error.message
        }
      }
    } else {
      return {
        status: "failed",
        data: [],
        message: "Verification code not valid"
      }
    }
    delete data['password']
    delete data['verification_code']
    data.is_active = true
    return {
      status: "success",
      data: data,
      message: "Data successfully saved"
    }
  }

  @Get()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findAll() {
    let data;
    try {
      data = await this.userService.findAll();
    } catch (error) {
      return {
        status: "failed",
        data: {},
        message: error.message
      }
    }
    data.forEach(function(key){ delete key.password });
    return {
      status: "success",
      data: data,
      message: "Data successfully loaded"
    }
  }

  @Get(':id')
  @Roles('user', 'admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async findOne(@Param('id') id: string) {
    let data = await this.userService.findOne(id);
    if(data === null){
      throw new HttpException({
        status: "failed",
        data: data,
        message: "Data not found"
      }, HttpStatus.NOT_FOUND);
    }
    delete data['password']
    delete data['verification_code']
    return {
      status: "success",
      data: data,
      message: "Data successfully loaded"
    }
  }

  @Patch(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    let data = await this.userService.findOne(id);
    if(data === null){
      throw new HttpException({
        status: "failed",
        data: data,
        message: "Data not found"
      }, HttpStatus.NOT_FOUND);
    }
    try {
      await this.userService.update(id, updateUserDto);
    } catch (error) {
      return {
        status: "failed",
        data: {},
        message: error.message
      }
    }
    delete updateUserDto['password']
    delete updateUserDto['verification_code']
    return {
      status: "success",
      data: updateUserDto,
      message: "Data successfully updated"
    }
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async remove(@Param('id') id: string) {
    let data = await this.userService.findOne(id);
    if(data === null){
      throw new HttpException({
        status: "failed",
        data: data,
        message: "Data not found"
      }, HttpStatus.NOT_FOUND);
    }
    try {
      data = await this.userService.remove(id);
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
