import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  PRODUCER_NOT_FIND,
  PRODUCER_REMOVE_FAILED,
} from 'src/utils/erros';
import { ProducerRepository } from '../producer.repository';

@Injectable()
export class RemoveProducerService {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async remove(id: string): Promise<void> {
    try {
      const producer = await this.producerRepository.findById(id)
      if (!producer) throw new NotFoundException(PRODUCER_NOT_FIND)
      await this.producerRepository.removeById(producer);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(PRODUCER_REMOVE_FAILED);
    }
  }
}
