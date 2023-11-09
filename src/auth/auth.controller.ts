import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RoleGuard } from './role.guard';
import { Roles } from './roles.decorator';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post('login')
  async login(@Res() res, @Body() authenticateDto: AuthenticateDto, @Body() createAuthDto: CreateAuthDto) {
    try {
      let user = await this.userService.findProfile(authenticateDto.email)
      if(user == null || undefined){
        throw new HttpException({
          status: "failed",
          data: [],
          message: "Account not found"
        }, HttpStatus.NOT_FOUND);
      }
      if (user.is_active === true) {
        let response = await this.authService.authenticate(authenticateDto);

        createAuthDto.jwt_token = response.token
        createAuthDto.email = response.user.email
        let date = new Date()
        date.setHours(date.getHours() + 1)
        createAuthDto.expired_at = date

        this.authService.create(createAuthDto)

        return res.status(HttpStatus.OK).json({ response });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({ 
          status: "failed",
          data: [],
          message: "Account is not active"  
        });
      }
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async logout(@Req() req){
    let localStorage = req.headers
    delete localStorage['authorization']
    return {
      statusCode : HttpStatus.OK,
      message : "Logged out"
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  async profile(@Req() req) {
    let user = await this.userService.findProfile(req.user.email)
    delete user['password']
    delete user['verification_code']
    return user;
  }

  @Get('jwt')
  findAll() {
    return this.authService.findAll();
  }
}
