import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubComponentDto } from './dto/create-sub-component.dto';
import { UpdateSubComponentDto } from './dto/update-sub-component.dto';
import { SubComponent } from './entities/sub-component.entity';

@Injectable()
export class SubComponentService {
  constructor(
    @InjectRepository(SubComponent) private subComponentRepo : Repository<SubComponent>
  ){}

  create(createSubComponentDto: CreateSubComponentDto) {
    return this.subComponentRepo.save(createSubComponentDto);
  }

  findAll() {
    let year = new Date().getFullYear()
    return this.subComponentRepo.find(
      {
        relations:['output', 'subOutput', 'component'],
        order: {
          output: "ASC"
        },
        where : {
          year: year
        }
      }
    );
  }

  findByFilter(start: number, limit: number) {
    let year = new Date().getFullYear()
    return this.subComponentRepo.find({
      relations:['output', 'subOutput', 'component'],
      where : {
        year: year
      },
      order: {
        output: "ASC"
      },
      skip: start,
      take: limit
    });
  }

  async findOne(id: string) {
    return this.subComponentRepo.findOne(
      {
        where: {
          id: id
        },
        relations: ['output', 'subOutput', 'component']
      }
    );
  }

  async findSubComponentByOutputSubOutputComponent(output: any, subOutput: any, component: any, subComponent: any) {
    let year = new Date().getFullYear()
    return this.subComponentRepo.findOne(
      {
        where: {
          output: output,
          subOutput: subOutput,
          component: component,
          subComponent: subComponent,
          year: year
        },
        relations: ['output', 'subOutput', 'component']
      }
    );
  }

  update(id: string, updateSubComponentDto: UpdateSubComponentDto) {
    updateSubComponentDto.id = id
    return this.subComponentRepo.save(updateSubComponentDto);
  }

  async remove(id: string) {
    let subComponent = await this.subComponentRepo.findOne({where: {id: id}});
    return this.subComponentRepo.remove(subComponent);
  }
}
