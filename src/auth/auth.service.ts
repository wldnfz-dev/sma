import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { AuthenticateDto } from './dto/authenticate.dto';
import { IAuthenticate, Role } from './interfaces/user.interface';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepo: Repository<Auth>,
    private userService: UserService
  ) {}

  async authenticate(authenticateDto: AuthenticateDto): Promise<IAuthenticate> {
    let user = await this.userService.findEmail(authenticateDto.email)
    if(user) {
      let valid = this.userService.compare(authenticateDto.password, user.password)
      if(valid) {
        delete user['password']
        let token = sign({ ...user }, 'secrete');
        return { token : token, user: user };
      } else {
          throw new BadRequestException({ statusCode: 400, message: 'Invalid credentials' });
      }
    } else {
      throw new BadRequestException({ statusCode: 400, message: 'Email not exist'})
    }
  }

  create(createAuthDto: CreateAuthDto) {
    return this.authRepo.save(createAuthDto)
  }

  findAll() {
    return this.authRepo.find();
  }
}
