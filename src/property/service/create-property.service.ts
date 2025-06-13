import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { Property } from '../entities/property.entity';
import {
  ARABLE_FARM_AREA_AND_VEGETATION_FARM_AREA_SHOULD_FIT_TOTAL_FARM_AREA,
  PRODUCER_NOT_FIND,
  PROPERTY_NOT_CREATE,
} from 'src/utils/erros';
import { PropertyRepository } from '../property.repository';
import { ProducerRepository } from 'src/producer/producer.repository';

@Injectable()
export class CreatePropertyService {
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly producerRepository: ProducerRepository,
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
}
