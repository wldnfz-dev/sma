import { Injectable } from '@nestjs/common';
import { CreateGuDto } from './dto/create-gu.dto';
import { UpdateGuDto } from './dto/update-gu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gu } from './entities/gu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuService {
  constructor(
    @InjectRepository(Gu) private guRepo: Repository<Gu>
  ) {}

  create(createGuDto: CreateGuDto) {
    return this.guRepo.save(createGuDto);
  }

  findAll() {
    return this.guRepo.find({
      join: { alias: 'gus', innerJoin: { status: 'gus.status' } },
      relations: ['status']
    });
  }

  findOne(id: string) {
    return this.guRepo.findOne({
      join: { alias: 'gus', innerJoin: { status: 'gus.status' } },
      relations: ['status'],
      where: {id: id}
    });
  }

  findByUnit(unit: string) {
    return this.guRepo.findOne({where: {unit: unit}});
  }

  update(id: string, updateGuDto: UpdateGuDto) {
    updateGuDto.id = id
    return this.guRepo.save(updateGuDto);
  }

  async remove(id: string) {
    let gu = await this.guRepo.findOne({where: {id: id}});
    return this.guRepo.remove(gu);
  }
}
