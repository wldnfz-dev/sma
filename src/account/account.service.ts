import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepo: Repository<Account>
  ){}

  create(createAccountDto: CreateAccountDto) {
    return this.accountRepo.save(createAccountDto);
  }

  findAll() {
    return this.accountRepo.find();
  }

  findByFilter(start: number, limit: number) {
    return this.accountRepo.find({
      skip: start,
      take: limit
    });
  }

  findOne(id: string) {
    return this.accountRepo.findOne({where: {id: id}});
  }

  update(id: string, updateAccountDto: UpdateAccountDto) {
    updateAccountDto.id = id
    return this.accountRepo.save(updateAccountDto);
  }

  async remove(id: string) {
    let account = await this.accountRepo.findOne({where: {id: id}});
    return this.accountRepo.remove(account);
  }
}
