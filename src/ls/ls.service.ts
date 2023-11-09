import { Injectable } from '@nestjs/common';
import { CreateLDto } from './dto/create-l.dto';
import { UpdateLDto } from './dto/update-l.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { L } from './entities/l.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LsService {
  constructor(
    @InjectRepository(L) private lsRepo: Repository<L>
  ) {}

  create(createLDto: CreateLDto) {
    return this.lsRepo.save(createLDto);
  }

  findAll() {
    return this.lsRepo.find();
  }

  findOne(id: string) {
    return this.lsRepo.findOne({where: {id: id}});
  }

  update(id: string, updateLDto: UpdateLDto) {
    updateLDto.id = id
    return this.lsRepo.save(updateLDto);
  }

  async remove(id: string) {
    let ls = await this.lsRepo.findOne({where: {id: id}});
    return this.lsRepo.remove(ls);
  }
}
