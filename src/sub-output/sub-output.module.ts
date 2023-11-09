import { Module } from '@nestjs/common';
import { SubOutputService } from './sub-output.service';
import { SubOutputController } from './sub-output.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubOutput } from './entities/sub-output.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubOutput])
  ],
  controllers: [SubOutputController],
  providers: [SubOutputService],
  exports: [SubOutputService]
})
export class SubOutputModule {}
