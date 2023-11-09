import { Module } from '@nestjs/common';
import { PaguService } from './pagu.service';
import { PaguController } from './pagu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagu } from './entities/pagu.entity';
import { SubComponentModule } from 'src/sub-component/sub-component.module';
import { SubOutputModule } from 'src/sub-output/sub-output.module';
import { ComponentModule } from 'src/component/component.module';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pagu]),
    SubOutputModule,
    ComponentModule,
    SubComponentModule,
    AccountModule
  ],
  controllers: [PaguController],
  providers: [PaguService]
})
export class PaguModule {}
