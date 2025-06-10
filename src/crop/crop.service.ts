import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Crop } from './entities/crop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CropService {
  constructor(
    @InjectRepository(Crop)
    private cropRepo: Repository<Crop>,
  ) {}

  create(dto: CreateCropDto) {
    const crop = this.cropRepo.create(dto);
    return this.cropRepo.save(crop);
  }

  findAll() {
    return this.cropRepo.find({ relations: ['property'] });
  }

  findOne(id: string) {
    return this.cropRepo.findOne({ where: { id }, relations: ['property'] });
  }

  update(id: string, dto: UpdateCropDto) {
    return this.cropRepo.update(id, dto);
  }

  remove(id: string) {
    return this.cropRepo.delete(id);
  }
}

