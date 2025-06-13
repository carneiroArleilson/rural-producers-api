import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Producer } from '../entities/producer.entity';
import {
  PRODUCER_FIND_FAILED,
} from 'src/utils/erros';
import { ProducerRepository } from '../producer.repository';

@Injectable()
export class FindAllProducerService {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async findAll(): Promise<Producer[]> {
    try {
      return await this.producerRepository.findAll();
    } catch {
      throw new InternalServerErrorException(PRODUCER_FIND_FAILED);
    }
  }
}
