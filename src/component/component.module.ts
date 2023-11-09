import { Module } from '@nestjs/common';
import { ComponentService } from './component.service';
import { ComponentController } from './component.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from './entities/component.entity';
import { SubOutputModule } from 'src/sub-output/sub-output.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Component]),
    SubOutputModule
  ],
  controllers: [ComponentController],
  providers: [ComponentService],
  exports: [ComponentService]
})
export class ComponentModule {}
