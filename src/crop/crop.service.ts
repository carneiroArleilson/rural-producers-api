import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from './entities/crop.entity';
import { Property } from '../property/entities/property.entity';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

@Injectable()
export class CropService {
  constructor(
    @InjectRepository(Crop)
    private readonly cropRepository: Repository<Crop>,

    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async create(dto: CreateCropDto): Promise<Crop> {
    const property = await this.propertyRepository.findOneBy({ id: dto.propertyId });

    if (!property) {
      throw new NotFoundException(`Propriedade com ID ${dto.propertyId} não encontrada`);
    }

    const crop = this.cropRepository.create({ ...dto, property });
    return this.cropRepository.save(crop);
  }

  async findAll(): Promise<Crop[]> {
    return this.cropRepository.find({
      relations: ['property'],
    });
  }

  async findOne(id: string): Promise<Crop> {
    const crop = await this.cropRepository.findOne({
      where: { id },
      relations: ['property'],
    });

    if (!crop) {
      throw new NotFoundException(`Cultura com ID ${id} não encontrada`);
    }

    return crop;
  }

  async update(id: string, dto: UpdateCropDto): Promise<Crop> {
    const crop = await this.findOne(id);
    Object.assign(crop, dto);
    return this.cropRepository.save(crop);
  }

  async remove(id: string): Promise<void> {
    const result = await this.cropRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cultura com ID ${id} não encontrada`);
    }
  }
}
