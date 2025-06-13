import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProducerDto } from '../dto/update-producer.dto';
import { Producer } from '../entities/producer.entity';
import {
  PRODUCER_NOT_FIND,
  PRODUCER_UPDATE_FAILED,
} from 'src/utils/erros';
import { ProducerRepository } from '../producer.repository';

@Injectable()
export class UpdateProducerService {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async update(id: string, dto: UpdateProducerDto): Promise<Producer | null> {
    try {
      const producer = await this.producerRepository.findById(id)
      if (!producer) throw new NotFoundException(PRODUCER_NOT_FIND)
      return await this.producerRepository.updateById(id, dto);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(PRODUCER_UPDATE_FAILED);
    }
  }
}
