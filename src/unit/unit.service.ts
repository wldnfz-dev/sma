import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Unit } from './entities/unit.entity';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit) private unitRepo: Repository<Unit>
  ) {}

  create(createUnitDto: CreateUnitDto) {
    return this.unitRepo.save(createUnitDto);
  }

  findAll() {
    return this.unitRepo.find();
  }

  findOne(id: string) {
    return this.unitRepo.findOne({where: {id: id}});
  }

  update(id: string, updateUnitDto: UpdateUnitDto) {
    updateUnitDto.id = id
    return this.unitRepo.save(updateUnitDto);
  }

  async remove(id: string) {
    let unit = await this.unitRepo.findOne({where: {id: id}});
    return this.unitRepo.remove(unit);
  }
}
