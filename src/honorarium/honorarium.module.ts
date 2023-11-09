import { Module } from '@nestjs/common';
import { HonorariumService } from './honorarium.service';
import { HonorariumController } from './honorarium.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Honorarium } from './entities/honorarium.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Honorarium])
  ],
  controllers: [HonorariumController],
  providers: [HonorariumService],
})
export class HonorariumModule {}
