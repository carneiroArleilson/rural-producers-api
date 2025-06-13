import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Property } from '../entities/property.entity';
import {
  PROPERTY_FIND_FAILED,
} from 'src/utils/erros';
import { PropertyRepository } from '../property.repository';

@Injectable()
export class FindAllPropertyService {
  constructor(
    private readonly propertyRepository: PropertyRepository,
  ) {}

  async findAll(): Promise<Property[]> {
    try {
      return await this.propertyRepository.findWithProducer();
    } catch (error) {
      throw new InternalServerErrorException(PROPERTY_FIND_FAILED);
    }
  }
}
