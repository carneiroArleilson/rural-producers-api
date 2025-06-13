import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  PROPERTY_NOT_FIND,
  PROPERTY_REMOVE_FAILED,
} from 'src/utils/erros';
import { PropertyRepository } from '../property.repository';

@Injectable()
export class RemovePropertyService {
  constructor(
    private readonly propertyRepository: PropertyRepository,
  ) {}

  async remove(id: string): Promise<void> {
    try {
      const property = await this.propertyRepository.findById(id)
      if (!property) throw new NotFoundException(PROPERTY_NOT_FIND)
      await this.propertyRepository.removeById(property);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(PROPERTY_REMOVE_FAILED);
    }
  }
}
