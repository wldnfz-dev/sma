import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private fileRepo: Repository<File>
  ) {}

  create(createFileDto: CreateFileDto) {
    return this.fileRepo.save(createFileDto);
  }

  findAll() {
    return this.fileRepo.find();
  }

  findOne(id: string) {
    return this.fileRepo.findOne({where: {id: id}});
  }

  update(id: string, updateFileDto: UpdateFileDto) {
    updateFileDto.id = id
    return this.fileRepo.save(updateFileDto);
  }

  async remove(id: string) {
    let file = await this.fileRepo.findOne({where: {id: id}});
    return this.fileRepo.remove(file);
  }
}
