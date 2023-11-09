import { Injectable } from '@nestjs/common';
import { CreateStatusGuDto } from './dto/create-status-gu.dto';
import { UpdateStatusGuDto } from './dto/update-status-gu.dto';
import { StatusGu } from './entities/status-gu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StatusGuService {
  constructor(
    @InjectRepository(StatusGu) private personilRepo : Repository<StatusGu>
  ){}

  create(createStatusGuDto: CreateStatusGuDto) {
    return this.personilRepo.save(createStatusGuDto);
  }

  findAll() {
    return this.personilRepo.find();
  }

  findOne(id: number) {
    return this.personilRepo.findOne(id);
  }

  findPersonil(submissionId: string){
    return this.personilRepo.find({
      where: {
        submissionId: submissionId
      }
    })
  }

  update(id: number, updateStatusGuDto: UpdateStatusGuDto) {
    updateStatusGuDto.id = id
    return this.personilRepo.save(updateStatusGuDto);
  }

  async remove(id: number) {
    let personil = await this.personilRepo.findOne(id);
    return this.personilRepo.remove(personil);
  }
}
