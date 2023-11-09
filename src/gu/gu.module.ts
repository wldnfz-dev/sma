import { Module } from '@nestjs/common';
import { GuService } from './gu.service';
import { GuController } from './gu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gu } from './entities/gu.entity';
import { StatusGuModule } from 'src/status-gu/status-gu.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gu]),
    StatusGuModule
  ],
  controllers: [GuController],
  providers: [GuService],
})
export class GuModule {}
