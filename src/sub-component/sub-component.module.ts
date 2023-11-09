import { Module } from '@nestjs/common';
import { SubComponentService } from './sub-component.service';
import { SubComponentController } from './sub-component.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubComponent } from './entities/sub-component.entity';
import { SubOutputModule } from 'src/sub-output/sub-output.module';
import { ComponentModule } from 'src/component/component.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubComponent]),
    SubOutputModule,
    ComponentModule
  ],
  controllers: [SubComponentController],
  providers: [SubComponentService],
  exports: [SubComponentService]
})
export class SubComponentModule {}
