import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Property } from '../entities/property.entity';
import {
  PROPERTY_FIND_FAILED,
  PROPERTY_NOT_FIND,
} from 'src/utils/erros';
import { PropertyRepository } from '../property.repository';

@Injectable()
export class FindOnePropertyService {
  constructor(
    private readonly propertyRepository: PropertyRepository,
  ) {}

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
}
