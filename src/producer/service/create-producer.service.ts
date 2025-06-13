import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProducerDto } from '../dto/create-producer.dto';
import { Producer } from '../entities/producer.entity';
import {
  PRODUCER_NOT_CREATE,
} from 'src/utils/erros';
import { ProducerRepository } from '../producer.repository';

@Injectable()
export class CreateProducerService {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async create(dto: CreateProducerDto): Promise<Producer> {
    try {
      return await this.producerRepository.createAndSave(dto);
    } catch {
      throw new InternalServerErrorException(PRODUCER_NOT_CREATE);
    }
  }
}
