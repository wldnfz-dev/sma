import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, HttpStatus, HttpException, InternalServerErrorException, BadRequestException, Query } from '@nestjs/common';
import { PaguService } from './pagu.service';
import { CreatePaguDto } from './dto/create-pagu.dto';
import { UpdatePaguDto } from './dto/update-pagu.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Helper } from './helper';
import { SubComponentService } from 'src/sub-component/sub-component.service';
import { SubOutputService } from 'src/sub-output/sub-output.service';
import { ComponentService } from 'src/component/component.service';
import { AccountService } from 'src/account/account.service';

@Controller('pagu')
export class PaguController {
  constructor(
    private readonly paguService: PaguService,
    private readonly subOutputService: SubOutputService,
    private readonly componentService: ComponentService,
    private readonly subComponentService: SubComponentService,
    private readonly accountService: AccountService
  ){}
  
  @Post()
  // @Roles({ roles: ['admin'] })
  async create(@Body() createPaguDto: CreatePaguDto) {
    let subOutput = await this.subOutputService.findByOutputSubOutputCode(createPaguDto.output, createPaguDto.subOutput);
    if(subOutput == null) {
      throw new BadRequestException;
    }
    let component = await this.componentService.findComponentByOutputSubOutputCode(createPaguDto.output, subOutput.id, createPaguDto.component);
    if(component == null) {
      throw new BadRequestException;
    }
    let subComponent = await this.subComponentService.findSubComponentByOutputSubOutputComponent(createPaguDto.output, subOutput.id, component.id, createPaguDto.subComponent)
    if(subComponent == null) {
      throw new BadRequestException;
    }
    let account = await this.accountService.findOne(createPaguDto.account as any)
    if(account == null) {
      throw new BadRequestException;
    }
    let data = await this.paguService.findAccount(createPaguDto.output, subOutput.id, component.id, subComponent.id, createPaguDto.account)
    if(data == null) {
      try {
        createPaguDto.subOutput = subOutput.id as any
        createPaguDto.component = component.id as any
        createPaguDto.subComponent = subComponent.id as any
        this.paguService.create(createPaguDto);
        return {
          statusCode : HttpStatus.CREATED,
          message : "MAK data successfully saved"
        }
      } catch(error) {
        throw new InternalServerErrorException;
      }
    } else {
      throw new HttpException({
        statusCode : HttpStatus.BAD_REQUEST,
        message : "MAK data already exist"
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/import')
  // @Roles({ roles: ['admin'] })
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: Helper.filePath,
        filename: Helper.customFileName
      }),
    })
  )
  async uploadFile(@UploadedFile() files: any) {
    const csvFilePath = './files/pagu/pagu.csv'
    const fs = require("fs");
    const buffer = fs.readFileSync(csvFilePath);

    let fileContent = buffer.toString();
    fileContent = fileContent.split(";").join(",")
    fs.writeFile('./files/pagu/pagu.csv', fileContent, function(err) {
      if (err) throw new InternalServerErrorException;
    });
    
    const csv = require('csvtojson')

    await csv()
    .fromFile(csvFilePath)
    .then(async (result: any) => {
      try {
        await this.paguService.truncate()
        for (var i = 0; i < result.length; i++) {
          if(Object.keys(result[i]).length != 12) {
            throw new InternalServerErrorException;
          }
          let subOutput = await this.subOutputService.findByOutputSubOutputCode(result[i].output, result[i].subOutput);
          let component = await this.componentService.findComponentByOutputSubOutputCode(result[i].output, subOutput.id, result[i].component);
          let subComponent = await this.subComponentService.findSubComponentByOutputSubOutputComponent(result[i].output, subOutput.id, component.id, result[i].subComponent)
          result[i].subOutput = subOutput.id;
          result[i].component = component.id;
          result[i].subComponent = subComponent.id;
          if(result[i].id == '' || result[i].id == null) {
            delete result[i]['id'];
            this.paguService.create(result[i]);
          } else {
            this.paguService.update(result[i].id, result[i]);
          }
        }
      } catch(error) {
        throw new BadRequestException;
      }
    })
    return {
      statusCode : HttpStatus.CREATED,
      message : "POK successfully imported"
    }
  }

  @Get()
  findAll() {
    return this.paguService.findAll();
  }

  @Get('filter?')
  async findByFilter(
    @Query('start') start: number,
    @Query('limit') limit: number,
  ) {
    return this.paguService.findByFilter(start, limit);
  }

  @Get('/export')
  async export(@Res() res){
    const fs = require('fs');
    const jsonexport = require('jsonexport');
    const pagu = await this.paguService.find();

    const result = await Promise.all(pagu.map(async pagu => {
      delete pagu.created_at;
      delete pagu.updated_at;
      const idSubOutput = pagu.subOutput.id as any;
      const idComponent = pagu.component.id as any;
      const idSubComponent = pagu.subComponent.id as any;
      const subOutput = await this.subOutputService.findOne(idSubOutput);
      const component = await this.componentService.findOne(idComponent);
      const subComponent = await this.subComponentService.findOne(idSubComponent);
      pagu.subOutput = subOutput.subOutputCode as any
      pagu.component = component.componentCode as any
      pagu.subComponent = subComponent.subComponent as any
      return pagu;
    }));

    jsonexport(result, function(err, csv) {
      csv = csv.split(",").join(";")
      if (err) throw new InternalServerErrorException;
      fs.writeFile('./files/export/pagu.csv', csv, function(err) {
        if (err) throw new InternalServerErrorException;
        const paguFile = "./files/export/pagu.csv";
        return res.download(paguFile);
      });
    }); 
  }

  @Get('/total')
  async sumPagu() {
    let pagu = await this.paguService.totalPagu();
    return {
      statusCode : HttpStatus.OK,
      pagu
    } 
  }

  @Get('/total/:output')
  async sumPaguByOutput(@Param('output') output: string) {
    let pagu = await this.paguService.totalPaguByOutput(output);
    return {
      statusCode : HttpStatus.OK,
      pagu
    }
  }

  @Get('/total/:output/:subOutput')
  async sumPaguBySubOutput(@Param('output') output: string, @Param('subOutput') subOutput: string) {
    let pagu = await this.paguService.totalPaguBySubOutput(output, subOutput);
    return {
      statusCode : HttpStatus.OK,
      pagu
    }
  }

  @Get('/total/:output/:subOutput/:component')
  async sumPaguByComponent(@Param('output') output: string, @Param('subOutput') subOutput: string, @Param('component') component: string) {
    let pagu = await this.paguService.totalPaguByComponent(output, subOutput, component);
    return {
      statusCode : HttpStatus.OK,
      pagu
    }
  }

  @Get('/total/:output/:subOutput/:component/:subComponent')
  async sumPaguBySubComponent(@Param('output') output: string, @Param('subOutput') subOutput: string, @Param('component') component: string, @Param('subComponent') subComponent: string) {
    let pagu = await this.paguService.totalPaguBySubComponent(output, subOutput, component, subComponent);
    return {
      statusCode : HttpStatus.OK,
      pagu
    }
  }

  @Get('/realisasi')
  async sumRealisasi() {
    let pagu = await this.paguService.totalRealisasi();
    return {
      statusCode : HttpStatus.OK,
      pagu
    } 
  }

  @Get('/realisasi/:output')
  async sumRealisasiByOutput(@Param('output') output: string) {
    let pagu = await this.paguService.totalRealisasiByOutput(output);
    return {
      statusCode : HttpStatus.OK,
      pagu
    }
  }

  @Get('/realisasi/:output/:subOutput')
  async sumRealisasiBySubOutput(@Param('output') output: string, @Param('subOutput') subOutput: string) {
    let pagu = await this.paguService.totalRealisasiBySubOutput(output, subOutput);
    return {
      statusCode : HttpStatus.OK,
      pagu
    }
  }

  @Get('/realisasi/:output/:subOutput/:component')
  async sumRealisasiByComponent(@Param('output') output: string, @Param('subOutput') subOutput: string, @Param('component') component: string) {
    let pagu = await this.paguService.totalRealisasiByComponent(output, subOutput, component);
    return {
      statusCode : HttpStatus.OK,
      pagu
    }
  }

  @Get('/realisasi/:output/:subOutput/:component/:subComponent')
  async sumRealisasiBySubComponent(@Param('output') output: string, @Param('subOutput') subOutput: string, @Param('component') component: string, @Param('subComponent') subComponent: string) {
    let pagu = await this.paguService.totalRealisasiBySubComponent(output, subOutput, component, subComponent);
    return {
      statusCode : HttpStatus.OK,
      pagu
    }
  }

  @Get('/sisa')
  async sumSisa() {
    let pagu = await this.paguService.totalSisa();
    return {
      statusCode : HttpStatus.OK,
      pagu
    } 
  }

  @Get('/sisa/:output')
  async sumSisaByOutput(@Param('output') output: string) {
    let pagu = await this.paguService.totalSisaByOutput(output);
    return {
      statusCode : HttpStatus.OK,
      pagu
    }
  }

  @Get('/sisa/:output/:subOutput')
  async sumSisaBySubOutput(@Param('output') output: string, @Param('subOutput') subOutput: string) {
    let pagu = await this.paguService.totalSisaBySubOutput(output, subOutput);
    return {
      statusCode : HttpStatus.OK,
      pagu
    }
  }

  @Get('/sisa/:output/:subOutput/:component')
  async sumSisaByComponent(@Param('output') output: string, @Param('subOutput') subOutput: string, @Param('component') component: string) {
    let pagu = await this.paguService.totalSisaByComponent(output, subOutput, component);
    return {
      statusCode : HttpStatus.OK,
      pagu
    }
  }

  @Get('/sisa/:output/:subOutput/:component/:subComponent')
  async sumSisaBySubComponent(@Param('output') output: string, @Param('subOutput') subOutput: string, @Param('component') component: string, @Param('subComponent') subComponent: string) {
    let pagu = await this.paguService.totalSisaBySubComponent(output, subOutput, component, subComponent);
    return {
      statusCode : HttpStatus.OK,
      pagu
    }
  }

  @Get('jaldis/total')
  async sumPaguJaldis() {
    let pagu = await this.paguService.totalPaguJaldis();
    return {
      statusCode : HttpStatus.OK,
      pagu
    }
  }

  @Get('jaldis/realisasi')
  async sumRealisasiJaldis() {
    let pagu = await this.paguService.totalRealisasiJaldis();
    return {
      statusCode : HttpStatus.OK,
      pagu
    }
  }

  @Get('jaldis/sisa')
  async sumSisaJaldis() {
    let pagu = await this.paguService.totalSisaJaldis();
    return {
      statusCode : HttpStatus.OK,
      pagu
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let data = await this.paguService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "MAK data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      return data;
    }
  }

  @Patch(':id')
  // @Roles({ roles: ['admin'] })
  async update(@Param('id') id: string, @Body() updatePaguDto: UpdatePaguDto) {
    let data = await this.paguService.findOne(id);
    let subOutput = await this.subOutputService.findByOutputSubOutputCode(updatePaguDto.output, updatePaguDto.subOutput);
    if(subOutput == null) {
      throw new BadRequestException;
    } 
    let component = await this.componentService.findComponentByOutputSubOutputCode(updatePaguDto.output, subOutput.id, updatePaguDto.component);
    if(component == null) {
      throw new BadRequestException;
    } 
    let subComponent = await this.subComponentService.findSubComponentByOutputSubOutputComponent(updatePaguDto.output, subOutput.id, component.id, updatePaguDto.subComponent)
    if(subComponent == null) {
      throw new BadRequestException;
    } 
    let account = await this.accountService.findOne(updatePaguDto.account as any)
    if(account == null) {
      throw new BadRequestException;
    }
    let mak = await this.paguService.findAccount(updatePaguDto.output, subOutput.id, component.id, subComponent.id, updatePaguDto.account)
    if(data == null) {
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "MAK data not found"
      }, HttpStatus.NOT_FOUND);
    } else if(mak != null) {
      if(id != mak.id && mak != null) {
        throw new HttpException({
          statusCode : HttpStatus.BAD_REQUEST,
          message : "MAK data already exist"
        }, HttpStatus.BAD_REQUEST);
      } else {
        updatePaguDto.subOutput = subOutput.id as any
        updatePaguDto.component = component.id as any
        updatePaguDto.subComponent = subComponent.id as any
        this.paguService.update(id, updatePaguDto);
        return {
          statusCode : HttpStatus.OK,
          message : "MAK data successfully updated"
        } 
      }
    } else {
      updatePaguDto.subOutput = subOutput.id as any
      updatePaguDto.component = component.id as any
      updatePaguDto.subComponent = subComponent.id as any
      this.paguService.update(id, updatePaguDto);
      return {
        statusCode : HttpStatus.OK,
        message : "MAK data successfully updated"
      } 
    }
  }

  @Delete(':id')
  // @Roles({ roles: ['admin'] })
  async remove(@Param('id') id: string) {
    let data = await this.paguService.findOne(id);
    if(data == null){
      throw new HttpException({
        statusCode : HttpStatus.NOT_FOUND,
        message : "MAK data not found"
      }, HttpStatus.NOT_FOUND);
    } else {
      this.paguService.remove(id);
      return {
        statusCode : HttpStatus.OK,
        message : "MAK data successfully deleted"
      }
    }
  }
}
