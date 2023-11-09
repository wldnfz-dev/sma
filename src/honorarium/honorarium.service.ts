import { Injectable } from '@nestjs/common';
import { CreateHonorariumDto } from './dto/create-honorarium.dto';
import { UpdateHonorariumDto } from './dto/update-honorarium.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Honorarium } from './entities/honorarium.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HonorariumService {
  constructor(
    @InjectRepository(Honorarium) private honorariumRepo: Repository<Honorarium>
  ) {}

  create(createHonorariumDto: CreateHonorariumDto) {
    return this.honorariumRepo.save(createHonorariumDto);
  }

  findAll() {
    return this.honorariumRepo.find();
  }

  findOne(id: string) {
    return this.honorariumRepo.findOne({where: {id: id}});
  }

  update(id: string, updateHonorariumDto: UpdateHonorariumDto) {
    updateHonorariumDto.id = id
    return this.honorariumRepo.save(updateHonorariumDto);
  }

  async remove(id: string) {
    let honorarium = await this.honorariumRepo.findOne({where: {id: id}});
    return this.honorariumRepo.remove(honorarium);
  }
}
