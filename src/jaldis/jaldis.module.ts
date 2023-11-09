import { Module } from '@nestjs/common';
import { JaldisService } from './jaldis.service';
import { JaldisController } from './jaldis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jaldi } from './entities/jaldi.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Jaldi])
  ],
  controllers: [JaldisController],
  providers: [JaldisService],
})
export class JaldisModule {}
