import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../interfaces/user.interface';

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  role: Role;
}
