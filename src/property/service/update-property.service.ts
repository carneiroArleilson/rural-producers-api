import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { Property } from '../entities/property.entity';
import {
  ARABLE_FARM_AREA_AND_VEGETATION_FARM_AREA_SHOULD_FIT_TOTAL_FARM_AREA,
  PROPERTY_NOT_FIND,
  PROPERTY_UPDATE_FAILED,
} from 'src/utils/erros';
import { PropertyRepository } from '../property.repository';

@Injectable()
export class UpdatePropertyService {
  constructor(
    private readonly propertyRepository: PropertyRepository,
  ) {}

  async update(id: string, dto: UpdatePropertyDto): Promise<Property | null> {
    try {
      const property = await this.propertyRepository.findById(id);

      if (!property) {
        throw new NotFoundException(PROPERTY_NOT_FIND);
      }

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
}
