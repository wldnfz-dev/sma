import { Module } from '@nestjs/common';
import { LsService } from './ls.service';
import { LsController } from './ls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { L } from './entities/l.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([L])
  ],
  controllers: [LsController],
  providers: [LsService],
})
export class LsModule {}
