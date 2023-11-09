import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity) private activityRepo: Repository<Activity>
  ) {}

  create(createActivityDto: CreateActivityDto) {
    return this.activityRepo.save(createActivityDto);
  }

  findAll() {
    return this.activityRepo.find();
  }

  findOne(id: string) {
    return this.activityRepo.findOne({where: {id: id}});
  }

  update(id: string, updateActivityDto: UpdateActivityDto) {
    updateActivityDto.id = id
    return this.activityRepo.save(updateActivityDto);
  }

  async remove(id: string) {
    let activity = await this.activityRepo.findOne({where: {id: id}});
    return this.activityRepo.remove(activity);
  }
}
