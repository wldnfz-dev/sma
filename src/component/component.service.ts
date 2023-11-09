import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { Component } from './entities/component.entity';

@Injectable()
export class ComponentService {
  constructor(
    @InjectRepository(Component) private componentRepo: Repository<Component>
  ){}

  create(createComponentDto: CreateComponentDto) {
    return this.componentRepo.save(createComponentDto);
  }

  findAll() {
    let year = new Date().getFullYear()
    return this.componentRepo.find(
      {
        relations: ['output', 'subOutput'],
        order: {
          output: "ASC",
          subOutput: "ASC",
          componentCode: "ASC"
        },
        where : {
          year: year
        }
      }
    );
  }

  findOne(id: string) {
    return this.componentRepo.findOne(
      {
        where: {
          id: id
        },
        relations: ['output', 'subOutput']
      }
    );
  }

  async findComponentByOutputSubOutputCode(output: any, subOutput: any, componentCode: any) {
    let year = new Date().getFullYear()
    return this.componentRepo.findOne({
      where: {
        output: output,
        subOutput: subOutput,
        componentCode: componentCode,
        year: year
      },
      relations: ['output', 'subOutput']
    });
  }

  update(id: string, updateComponentDto: UpdateComponentDto) {
    updateComponentDto.id = id
    return this.componentRepo.save(updateComponentDto);
  }

  async remove(id: string) {
    let component = await this.componentRepo.findOne({where: {id: id}});
    return this.componentRepo.remove(component);
  }
}
