// src/producer/producer.service.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { Producer } from './entities/producer.entity';
import {
  PRODUCER_FIND_FAILED,
  PRODUCER_NOT_CREATE,
  PRODUCER_NOT_FIND,
  PRODUCER_REMOVE_FAILED,
  PRODUCER_UPDATE_FAILED,
} from 'src/utils/erros';
import { ProducerRepository } from './producer.repository';

@Injectable()
export class ProducerService {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async create(dto: CreateProducerDto): Promise<Producer> {
    try {
      return await this.producerRepository.createAndSave(dto);
    } catch {
      throw new InternalServerErrorException(PRODUCER_NOT_CREATE);
    }
  }

  async findAll(): Promise<Producer[]> {
    try {
      return await this.producerRepository.findAll();
    } catch {
      throw new InternalServerErrorException(PRODUCER_FIND_FAILED);
    }
  }

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

  async update(id: string, dto: UpdateProducerDto): Promise<Producer | null> {
    try {
      await this.findOne(id);
      return await this.producerRepository.updateById(id, dto);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(PRODUCER_UPDATE_FAILED);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const producer = await this.findOne(id);
      await this.producerRepository.removeById(producer);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(PRODUCER_REMOVE_FAILED);
    }
  }
}
