import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../property/entities/property.entity';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Crop } from './entities/crop.entity';
import {
  CROP_FIND_FAILED,
  CROP_NOT_CREATE,
  CROP_NOT_FIND,
  CROP_REMOVE_FAILED,
  CROP_UPDATE_FAILED,
  PROPERTY_NOT_FIND,
} from 'src/utils/erros';
import { CropRepository } from './crop.repository';

@Injectable()
export class CropService {
  constructor(
    private readonly cropRepository: CropRepository,

    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async create(dto: CreateCropDto): Promise<Crop> {
    try {
      const property = await this.propertyRepository.findOneBy({ id: dto.propertyId });

      if (!property) throw new NotFoundException(PROPERTY_NOT_FIND);

      return await this.cropRepository.createAndSave(dto, property);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(CROP_NOT_CREATE);
    }
  }

  async findAll(): Promise<Crop[]> {
    try {
      return await this.cropRepository.findAllWithProperty();
    } catch {
      throw new InternalServerErrorException(CROP_FIND_FAILED);
    }
  }

  async findOne(id: string): Promise<Crop> {
    try {
      const crop = await this.cropRepository.findByIdWithProperty(id);
      if (!crop) throw new NotFoundException(CROP_NOT_FIND);
      return crop;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(CROP_FIND_FAILED);
    }
  }

  async update(id: string, dto: UpdateCropDto): Promise<Crop | null> {
    try {
      await this.findOne(id);
      return await this.cropRepository.updateById(id, dto);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(CROP_UPDATE_FAILED);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const crop = await this.findOne(id);
      await this.cropRepository.removeByEntity(crop);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(CROP_REMOVE_FAILED);
    }
  }
}
