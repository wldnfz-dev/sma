import { Module } from '@nestjs/common';
import { StatusGuService } from './status-gu.service';
import { StatusGuController } from './status-gu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusGu } from './entities/status-gu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StatusGu])
  ],
  controllers: [StatusGuController],
  providers: [StatusGuService],
  exports: [StatusGuService]
})
export class StatusGuModule {}
