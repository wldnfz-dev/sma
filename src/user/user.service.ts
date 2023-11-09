import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    createUserDto.password = this.hash(createUserDto.password)
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: string) {
    return this.userRepo.findOne({ id: id });
  }

  findEmail(email) {
    return this.userRepo.findOne({ 
      select: ["id", "email", "password", "name", "unit", "role"], 
      where: {
        email: email
      }}
    );
  }

  findProfile(email) {
    return this.userRepo.findOne({
      where: {
        email: email
      }}
    );
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    updateUserDto.id = id
    if(updateUserDto.password) {
      updateUserDto.password = this.hash(updateUserDto.password)
    }
    return this.userRepo.save(updateUserDto);
  }

  async remove(id: string) {
    let user = await this.userRepo.findOne(id);
    return this.userRepo.remove(user);
  }

  hash(plainPassword) {
    const hash = bcrypt.hashSync(plainPassword, 10)
    return hash;
  }

  compare(plainPassword, hash) {
    const valid = bcrypt.compareSync(plainPassword, hash)
    return valid;
  }
}
