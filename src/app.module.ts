import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GuModule } from './gu/gu.module';
import { HonorariumModule } from './honorarium/honorarium.module';
import { LsModule } from './ls/ls.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AccountModule } from './account/account.module';
import { PaguModule } from './pagu/pagu.module';
import { ActivityModule } from './activity/activity.module';
import { ComponentModule } from './component/component.module';
import { OutputModule } from './output/output.module';
import { SubComponentModule } from './sub-component/sub-component.module';
import { SubOutputModule } from './sub-output/sub-output.module';
import { UnitModule } from './unit/unit.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { FileModule } from './file/file.module';
import { JaldisModule } from './jaldis/jaldis.module';
import { StatusGuModule } from './status-gu/status-gu.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.production', '.env.development', '.env'],
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type : process.env.DATABASE_TYPE as "mysql",
      host : process.env.DATABASE_HOST,
      port : parseInt(process.env.DATABASE_PORT),
      username : process.env.DATABASE_USERNAME,
      password : process.env.DATABASE_PASSWORD,
      database : process.env.DATABASE_NAME,
      entities : [
        "dist/**/*.entity{.ts,.js}"
      ],
      synchronize : false
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        ignoreTLS: true,
        secure: true,
        auth: {
          user: process.env.MAIL_FROM_ADDRESS,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`
      },
      template: {
        dir: process.cwd() + '/src/mail/template',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    MulterModule.register({
      dest: './files/pagu',
    }),
    MulterModule.register({
      dest: './files/gu',
    }),
    AuthModule,
    PassportModule,
    JwtModule.register({ secret: 'secrete', signOptions: { expiresIn: '1h' } }),
    UserModule,
    GuModule, 
    HonorariumModule, 
    LsModule, 
    PaguModule,
    AccountModule, 
    ActivityModule, 
    ComponentModule, 
    OutputModule, 
    SubComponentModule, 
    SubOutputModule, 
    UnitModule, 
    FileModule, JaldisModule, StatusGuModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
