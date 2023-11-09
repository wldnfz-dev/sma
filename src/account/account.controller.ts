import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  // @Roles({ roles: ['admin'] })
  async create(@Body() id, @Body() createAccountDto: CreateAccountDto) {
    let data = await this.accountService.findOne(id);
    if(data == null){
      this.accountService.create(createAccountDto);
      return {
        statusCode : HttpStatus.CREATED,
        message : "Account data successfully saved"
      }
    } else {
      throw new HttpException({
        statusCode : HttpStatus.BAD_REQUEST,
        message : "Account data already exist"
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Get('filter?')
  async findByFilter(
    @Query('start') start: number,
    @Query('limit') limit: number,
  ) {
    return this.accountService.findByFilter(start, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let data = await this.accountService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Account data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      return data;
    }
  }

  @Patch(':id')
  // @Roles({ roles: ['admin'] })
  async update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    let data = await this.accountService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Account data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      this.accountService.update(id, updateAccountDto);
      return {
        statusCode : HttpStatus.OK,
        message : "Account data successfully updated"
      }
    }
  }

  @Delete(':id')
  // @Roles({ roles: ['admin'] })
  async remove(@Param('id') id: string) {
    let data = await this.accountService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "Account data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      this.accountService.remove(id);
      return {
        statusCode : HttpStatus.OK,
        message : "Account data successfully deleted"
      }
    }
  }
}
