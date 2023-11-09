import { Module } from '@nestjs/common';
import { FilesService } from './file.service';
import { FilesController } from './file.controller';
import { File } from './entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([File])
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FileModule {}
