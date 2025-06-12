import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Crop } from './entities/crop.entity';
import { UpdateCropDto } from './dto/update-crop.dto';
import { CreateCropDto } from './dto/create-crop.dto';
import { Property } from 'src/property/entities/property.entity';

@Injectable()
export class CropRepository extends Repository<Crop> {
  constructor(private readonly dataSource: DataSource) {
    super(Crop, dataSource.createEntityManager());
  }

  async createAndSave(dto: CreateCropDto, property: Property): Promise<Crop> {
    const crop = this.create({ ...dto, property });
    return this.save(crop);
  }

  async findAllWithProperty(): Promise<Crop[]> {
    return this.find({ relations: ['property'] });
  }

  async findByIdWithProperty(id: string): Promise<Crop | null> {
    return this.findOne({
      where: { id },
      relations: ['property'],
    });
  }

  async updateById(id: string, dto: UpdateCropDto): Promise<Crop | null> {
    await this.update(id, dto);
    return this.findByIdWithProperty(id);
  }

  async removeByEntity(crop: Crop): Promise<void> {
    await this.remove(crop);
  }
}
