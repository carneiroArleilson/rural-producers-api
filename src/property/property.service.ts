import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { Producer } from 'src/producer/entities/producer.entity';
import { Repository } from 'typeorm';
import {
  ARABLE_FARM_AREA_AND_VEGETATION_FARM_AREA_SHOULD_FIT_TOTAL_FARM_AREA,
  PRODUCER_NOT_FIND,
  PROPERTY_FIND_FAILED,
  PROPERTY_NOT_CREATE,
  PROPERTY_NOT_FIND,
  PROPERTY_REMOVE_FAILED,
  PROPERTY_UPDATE_FAILED,
} from 'src/utils/erros';
import { PropertyRepository } from './property.repository';

@Injectable()
export class PropertyService {
  constructor(
    private readonly propertyRepository: PropertyRepository,

    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
  ) {}

  async create(dto: CreatePropertyDto): Promise<Property> {
    try {
      const { totalArea, agriculturalArea, vegetationArea } = dto;

      if (agriculturalArea + vegetationArea > totalArea) {
        throw new BadRequestException(
          ARABLE_FARM_AREA_AND_VEGETATION_FARM_AREA_SHOULD_FIT_TOTAL_FARM_AREA,
        );
      }

      const producer = await this.producerRepository.findOneBy({
        id: dto.producerId,
      });

      if (!producer) {
        throw new NotFoundException(PRODUCER_NOT_FIND);
      }

      return this.propertyRepository.createAndSave(dto, producer);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(PROPERTY_NOT_CREATE);
    }
  }

  async findAll(): Promise<Property[]> {
    try {
      return await this.propertyRepository.findWithProducer();
    } catch (error) {
      throw new InternalServerErrorException(PROPERTY_FIND_FAILED);
    }
  }

  async findOne(id: string): Promise<Property> {
    try {
      const property = await this.propertyRepository.findByIdWithProducer(id);

      if (!property) {
        throw new NotFoundException(PROPERTY_NOT_FIND);
      }

      return property;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(PROPERTY_FIND_FAILED);
    }
  }

  async update(id: string, dto: UpdatePropertyDto): Promise<Property | null> {
    try {
      const property = await this.findOne(id);

      const newTotal = dto.totalArea ?? property.totalArea;
      const newAgri = dto.agriculturalArea ?? property.agriculturalArea;
      const newVeg = dto.vegetationArea ?? property.vegetationArea;

      if (
        dto.totalArea !== undefined &&
        dto.agriculturalArea !== undefined &&
        dto.vegetationArea !== undefined &&
        dto.agriculturalArea + dto.vegetationArea > dto.totalArea
      ) {
        throw new BadRequestException(
          ARABLE_FARM_AREA_AND_VEGETATION_FARM_AREA_SHOULD_FIT_TOTAL_FARM_AREA,
        );
      }

      if (newAgri + newVeg > newTotal) {
        throw new BadRequestException(
          ARABLE_FARM_AREA_AND_VEGETATION_FARM_AREA_SHOULD_FIT_TOTAL_FARM_AREA,
        );
      }

      return await this.propertyRepository.updateById(id, dto);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(PROPERTY_UPDATE_FAILED);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const property = await this.findOne(id);

      if (!property) {
        throw new NotFoundException(PROPERTY_NOT_FIND);
      }

      await this.propertyRepository.removeById(property);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(PROPERTY_REMOVE_FAILED);
    }
  }
}
