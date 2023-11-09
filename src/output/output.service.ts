import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOutputDto } from './dto/create-output.dto';
import { UpdateOutputDto } from './dto/update-output.dto';
import { Output } from './entities/output.entity';

@Injectable()
export class OutputService {
  constructor(
    @InjectRepository(Output) private outputRepo: Repository<Output>
  ) {}

  create(createOutputDto: CreateOutputDto) {
    return this.outputRepo.save(createOutputDto);
  }

  findAll() {
    return this.outputRepo.find();
  }

  findOne(id: string) {
    return this.outputRepo.findOne({where: {id: id}});
  }

  update(id: string, updateOutputDto: UpdateOutputDto) {
    updateOutputDto.id = id
    return this.outputRepo.save(updateOutputDto);
  }

  async remove(id: string) {
    let output = await this.outputRepo.findOne({where: {id: id}});
    return this.outputRepo.remove(output);
  }
}
