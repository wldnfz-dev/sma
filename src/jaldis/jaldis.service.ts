import { Injectable } from '@nestjs/common';
import { CreateJaldiDto } from './dto/create-jaldi.dto';
import { UpdateJaldiDto } from './dto/update-jaldi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Jaldi } from './entities/jaldi.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JaldisService {
  constructor(
    @InjectRepository(Jaldi) private jaldisRepo: Repository<Jaldi>
  ) {}

  create(createJaldiDto: CreateJaldiDto) {
    return this.jaldisRepo.save(createJaldiDto);
  }

  findAll() {
    return this.jaldisRepo.find();
  }

  findOne(id: string) {
    return this.jaldisRepo.findOne({where: {id: id}});
  }

  update(id: string, updateJaldiDto: UpdateJaldiDto) {
    updateJaldiDto.id = id
    return this.jaldisRepo.save(updateJaldiDto);
  }

  async remove(id: string) {
    let honorarium = await this.jaldisRepo.findOne({where: {id: id}});
    return this.jaldisRepo.remove(honorarium);
  }
}
