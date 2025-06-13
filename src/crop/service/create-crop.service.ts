import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCropDto } from '../dto/create-crop.dto';
import { Crop } from '../entities/crop.entity';
import {
  CROP_NOT_CREATE,
  PROPERTY_NOT_FIND,
} from 'src/utils/erros';
import { CropRepository } from '../crop.repository';
import { PropertyRepository } from 'src/property/property.repository';

@Injectable()
export class CreateCropService {
  constructor(
    private readonly cropRepository: CropRepository,

    private readonly propertyRepository: PropertyRepository,
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
}
