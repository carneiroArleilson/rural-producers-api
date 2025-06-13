import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Producer } from '../entities/producer.entity';
import {
  PRODUCER_FIND_FAILED,
  PRODUCER_NOT_FIND,
} from 'src/utils/erros';
import { ProducerRepository } from '../producer.repository';

@Injectable()
export class FindOneProducerService {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async findOne(id: string): Promise<Producer> {
    try {
      const producer = await this.producerRepository.findById(id);
      if (!producer) throw new NotFoundException(PRODUCER_NOT_FIND);
      return producer;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(PRODUCER_FIND_FAILED);
    }
  }
}
