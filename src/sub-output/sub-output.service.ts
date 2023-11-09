import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubOutputDto } from './dto/create-sub-output.dto';
import { UpdateSubOutputDto } from './dto/update-sub-output.dto';
import { SubOutput } from './entities/sub-output.entity';

@Injectable()
export class SubOutputService {
  constructor(
    @InjectRepository(SubOutput) private subOutputRepo: Repository<SubOutput>
  ){}

  create(createSubOutputDto: CreateSubOutputDto) {
    return this.subOutputRepo.save(createSubOutputDto);
  }

  findAll() {
    let year = new Date().getFullYear()
    return this.subOutputRepo.find(
      {
        relations:['output'],
        order: {
          output: "ASC"
        },
        where : {
          year: year
        }
      }
    );
  }

  findOne(id: string) {
    return this.subOutputRepo.findOne({where: {id: id}});
  }

  async findByOutputSubOutputCode(output: any, subOutputCode: any) {
    let year = new Date().getFullYear()
    return this.subOutputRepo.findOne({
      where: {
        output: output,
        subOutputCode: subOutputCode,
        year: year
      },
      relations: ['output']
    });
  }

  update(id: string, updateSubOutputDto: UpdateSubOutputDto) {
    updateSubOutputDto.id = id
    return this.subOutputRepo.save(updateSubOutputDto);
  }

  async remove(id: string) {
    let subOutput = await this.subOutputRepo.findOne({where: {id: id}});
    return this.subOutputRepo.remove(subOutput);
  }
}
