import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producer } from './entities/producer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProducerService {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
  ) {}

  async create(createProducerDto: CreateProducerDto): Promise<Producer> {
    const producer = this.producerRepository.create(createProducerDto);
    return await this.producerRepository.save(producer);
  }

  async findAll(): Promise<Producer[]> {
    return await this.producerRepository.find();
  }

  async findOne(id: string): Promise<Producer> {
    const producer = await this.producerRepository.findOneBy({ id });
    if (!producer) {
      throw new NotFoundException(`Producer with ID ${id} not found`);
    }
    return producer;
  }

  async update(id: string, updateProducerDto: UpdateProducerDto): Promise<Producer | null> {
    await this.producerRepository.update(id, updateProducerDto);
    return this.producerRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    const result = await this.producerRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Producer with ID ${id} not found`);
    }
  }

}
