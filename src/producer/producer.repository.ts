import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Producer } from './entities/producer.entity';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';

@Injectable()
export class ProducerRepository extends Repository<Producer> {
  constructor(private readonly dataSource: DataSource) {
    super(Producer, dataSource.createEntityManager());
  }

  async createAndSave(dto: CreateProducerDto): Promise<Producer> {
    const producer = this.create(dto);
    return this.save(producer);
  }

  async findAll(): Promise<Producer[]> {
    return this.find();
  }

  async findById(id: string): Promise<Producer | null> {
    return this.findOne({ where: { id } });
  }

  async updateById(id: string, dto: UpdateProducerDto): Promise<Producer | null> {
    await this.update(id, dto);
    return this.findById(id);
  }

  async removeById(producer: Producer): Promise<void> {
    await this.remove(producer);
  }
}
