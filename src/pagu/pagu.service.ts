import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreatePaguDto } from './dto/create-pagu.dto';
import { UpdatePaguDto } from './dto/update-pagu.dto';
import { Pagu } from './entities/pagu.entity';

@Injectable()
export class PaguService {
  constructor(
    @InjectRepository(Pagu) private paguRepo : Repository<Pagu>
  ){}

  create(createPaguDto: CreatePaguDto) {
    return this.paguRepo.save(createPaguDto);
  }

  truncate() {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.delete({
      year: yyyy
    });
  }

  findAll() {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder('pagu')
    .leftJoinAndSelect('pagu.unit', 'unit')
    .leftJoinAndSelect('pagu.activity', 'activity')
    .leftJoinAndSelect('pagu.output', 'output')
    .leftJoinAndSelect('pagu.subOutput', 'subOutput')
    .leftJoinAndSelect('pagu.component', 'component')
    .leftJoinAndSelect('pagu.subComponent', 'subComponent')
    .leftJoinAndSelect('pagu.account', 'account')
    .orderBy({
      'unit.id': 'ASC',
      'activity.id': 'ASC',
      'output.id': 'ASC',
      'subOutput.subOutputCode': 'ASC',
      'component.componentCode': 'ASC',
      'subComponent.subComponent': 'ASC',
      'account.id': 'ASC'
    })
    .where('pagu.year = :yyyy', { yyyy })
    .getMany()
  }

  findByFilter(start: number, limit: number) {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder('pagu')
    .leftJoinAndSelect('pagu.unit', 'unit')
    .leftJoinAndSelect('pagu.activity', 'activity')
    .leftJoinAndSelect('pagu.output', 'output')
    .leftJoinAndSelect('pagu.subOutput', 'subOutput')
    .leftJoinAndSelect('pagu.component', 'component')
    .leftJoinAndSelect('pagu.subComponent', 'subComponent')
    .leftJoinAndSelect('pagu.account', 'account')
    .orderBy({
      'unit.id': 'ASC',
      'activity.id': 'ASC',
      'output.id': 'ASC',
      'subOutput.subOutputCode': 'ASC',
      'component.componentCode': 'ASC',
      'subComponent.subComponent': 'ASC',
      'account.id': 'ASC'
    })
    .where('pagu.year = :yyyy', { yyyy })
    .skip(start)
    .take(limit)
    .getMany()
  }

  findOne(id: string) {
    return this.paguRepo.findOne(
      {
        where: {
          id: id
        },
        relations:['unit', 'activity', 'output', 'subOutput', 'component', 'subComponent', 'account'],
      });
  }

  find() {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder('pagu')
    .leftJoinAndMapOne('unit.id', 'pagu.unit', 'unit')
    .leftJoinAndMapOne('activity.id', 'pagu.activity', 'activity')
    .leftJoinAndMapOne('output.id', 'pagu.output', 'output')
    .leftJoinAndSelect('pagu.subOutput', 'subOutput')
    .leftJoinAndSelect('pagu.component', 'component')
    .leftJoinAndSelect('pagu.subComponent', 'subComponent')
    .leftJoinAndMapOne('account.id', 'pagu.account', 'account')
    .orderBy({
      'unit.id': 'ASC',
      'activity.id': 'ASC',
      'output.id': 'ASC',
      'subOutput.subOutputCode': 'ASC',
      'component.componentCode': 'ASC',
      'subComponent.subComponent': 'ASC',
      'account.id': 'ASC'
    })
    .where('pagu.year = :yyyy', { yyyy })
    .getMany()
  }

  totalPagu() {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .select("SUM(pagu.pagu)", "total")
    .where('pagu.year = :yyyy', { yyyy })
    .getRawOne();
  }

  totalByAccount(code: number) {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .leftJoinAndSelect('pagu.account', 'account')
    .select("SUM(pagu.pagu)", "total")
    .where('pagu.year = :yyyy', { yyyy })
    .andWhere('account.id = :code', { code })
    .getRawOne();
  }

  totalPaguJaldis() {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .leftJoinAndSelect('pagu.account', 'account')
    .select("SUM(pagu.pagu)", "total")
    .where('pagu.year = :yyyy', { yyyy })
    .andWhere('account.id LIKE "524%"')
    .getRawOne();
  }

  totalPaguByOutput(output: string) {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .leftJoinAndSelect('pagu.output', 'output')
    .select("SUM(pagu.pagu)", "total")
    .where('output.id = :output', { output })
    .andWhere('pagu.year = :yyyy', { yyyy })
    .getRawOne();
  }

  totalPaguBySubOutput(output: string, subOutput: string) {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .leftJoinAndSelect('pagu.output', 'output')
    .leftJoinAndSelect('pagu.subOutput', 'subOutput')
    .select("SUM(pagu.pagu)", "total")
    .where('output.id = :output AND subOutput.subOutputCode = :subOutput', { output, subOutput })
    .andWhere('pagu.year = :yyyy', { yyyy })
    .getRawOne();
  }

  totalPaguByComponent(output: string, subOutput: string, component: string) {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .leftJoinAndSelect('pagu.output', 'output')
    .leftJoinAndSelect('pagu.subOutput', 'subOutput')
    .leftJoinAndSelect('pagu.component', 'component')
    .select("SUM(pagu.pagu)", "total")
    .where('output.id = :output AND subOutput.subOutputCode = :subOutput AND component.componentCode = :component', { output, subOutput, component })
    .andWhere('pagu.year = :yyyy', { yyyy })
    .getRawOne();
  }

  totalPaguBySubComponent(output: string, subOutput: string, component: string, subComponent: string) {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .leftJoinAndSelect('pagu.output', 'output')
    .leftJoinAndSelect('pagu.subOutput', 'subOutput')
    .leftJoinAndSelect('pagu.component', 'component')
    .leftJoinAndSelect('pagu.subComponent', 'subComponent')
    .select("SUM(pagu.pagu)", "total")
    .where('output.id = :output AND subOutput.subOutputCode = :subOutput AND component.componentCode = :component AND subComponent.subComponent = :subComponent', { output, subOutput, component, subComponent })
    .andWhere('pagu.year = :yyyy', { yyyy })
    .getRawOne();
  }

  totalRealisasi() {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .select("SUM(pagu.realisasi)", "realisasi")
    .where('pagu.year = :yyyy', { yyyy })
    .getRawOne();
  }

  totalRealisasiJaldis() {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .leftJoinAndSelect('pagu.account', 'account')
    .select("SUM(pagu.realisasi)", "realisasi")
    .where('pagu.year = :yyyy', { yyyy })
    .andWhere('account.id LIKE "524%"')
    .getRawOne();
  }

  totalRealisasiByOutput(output: string) {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .leftJoinAndSelect('pagu.output', 'output')
    .select("SUM(pagu.realisasi)", "realisasi")
    .where('output.id = :output', { output })
    .andWhere('pagu.year = :yyyy', { yyyy })
    .getRawOne();
  }

  totalRealisasiBySubOutput(output: string, subOutput: string) {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .leftJoinAndSelect('pagu.output', 'output')
    .leftJoinAndSelect('pagu.subOutput', 'subOutput')
    .select("SUM(pagu.realisasi)", "realisasi")
    .where('output.id = :output AND subOutput.subOutputCode = :subOutput', { output, subOutput })
    .andWhere('pagu.year = :yyyy', { yyyy })
    .getRawOne();
  }

  totalRealisasiByComponent(output: string, subOutput: string, component: string) {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .leftJoinAndSelect('pagu.output', 'output')
    .leftJoinAndSelect('pagu.subOutput', 'subOutput')
    .leftJoinAndSelect('pagu.component', 'component')
    .select("SUM(pagu.realisasi)", "realisasi")
    .where('output.id = :output AND subOutput.subOutputCode = :subOutput AND component.componentCode = :component', { output, subOutput, component })
    .andWhere('pagu.year = :yyyy', { yyyy })
    .getRawOne();
  }

  totalRealisasiBySubComponent(output: string, subOutput: string, component: string, subComponent: string) {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .leftJoinAndSelect('pagu.output', 'output')
    .leftJoinAndSelect('pagu.subOutput', 'subOutput')
    .leftJoinAndSelect('pagu.component', 'component')
    .leftJoinAndSelect('pagu.subComponent', 'subComponent')
    .select("SUM(pagu.realisasi)", "realisasi")
    .where('output.id = :output AND subOutput.subOutputCode = :subOutput AND component.componentCode = :component AND subComponent.subComponent = :subComponent', { output, subOutput, component, subComponent })
    .andWhere('pagu.year = :yyyy', { yyyy })
    .getRawOne();
  }

  totalSisa() {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .select("SUM(pagu.sisa)", "sisa")
    .where('pagu.year = :yyyy', { yyyy })
    .getRawOne();
  }

  totalSisaJaldis() {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .leftJoinAndSelect('pagu.account', 'account')
    .select("SUM(pagu.sisa)", "sisa")
    .where('pagu.year = :yyyy', { yyyy })
    .andWhere('account.id LIKE "524%"')
    .getRawOne();
  }

  totalSisaByOutput(output: string) {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .leftJoinAndSelect('pagu.output', 'output')
    .select("SUM(pagu.sisa)", "sisa")
    .where('output.id = :output', { output })
    .andWhere('pagu.year = :yyyy', { yyyy })
    .getRawOne();
  }

  totalSisaBySubOutput(output: string, subOutput: string) {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .leftJoinAndSelect('pagu.output', 'output')
    .leftJoinAndSelect('pagu.subOutput', 'subOutput')
    .select("SUM(pagu.sisa)", "sisa")
    .where('output.id = :output AND subOutput.subOutputCode = :subOutput', { output, subOutput })
    .andWhere('pagu.year = :yyyy', { yyyy })
    .getRawOne();
  }

  totalSisaByComponent(output: string, subOutput: string, component: string) {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .leftJoinAndSelect('pagu.output', 'output')
    .leftJoinAndSelect('pagu.subOutput', 'subOutput')
    .leftJoinAndSelect('pagu.component', 'component')
    .select("SUM(pagu.sisa)", "sisa")
    .where('output.id = :output AND subOutput.subOutputCode = :subOutput AND component.componentCode = :component', { output, subOutput, component })
    .andWhere('pagu.year = :yyyy', { yyyy })
    .getRawOne();
  }

  totalSisaBySubComponent(output: string, subOutput: string, component: string, subComponent: string) {
    let yyyy = new Date().getFullYear();
    return this.paguRepo.createQueryBuilder("pagu")
    .leftJoinAndSelect('pagu.output', 'output')
    .leftJoinAndSelect('pagu.subOutput', 'subOutput')
    .leftJoinAndSelect('pagu.component', 'component')
    .leftJoinAndSelect('pagu.subComponent', 'subComponent')
    .select("SUM(pagu.sisa)", "sisa")
    .where('output.id = :output AND subOutput.subOutputCode = :subOutput AND component.componentCode = :component AND subComponent.subComponent = :subComponent', { output, subOutput, component, subComponent })
    .andWhere('pagu.year = :yyyy', { yyyy })
    .getRawOne();
  }

  findAccount(output: any, subOutput: any, component: any, subComponent: any, account: any){
    return this.paguRepo.findOne({
      where: {
        output: output,
        subOutput: subOutput,
        component: component,
        subComponent: subComponent,
        account: account
      }
    });
  }

  update(id: string, updatePaguDto: UpdatePaguDto) {
    updatePaguDto.id = id
    return this.paguRepo.save(updatePaguDto);
  }

  async remove(id: string) {
    let pagu = await this.paguRepo.findOne({where: {id: id}});
    return this.paguRepo.remove(pagu);
  }
}
