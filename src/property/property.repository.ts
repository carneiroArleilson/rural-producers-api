import { Property } from './entities/property.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Producer } from 'src/producer/entities/producer.entity';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertyRepository extends Repository<Property> {
  constructor(private dataSource: DataSource) {
    super(Property, dataSource.createEntityManager());
  }

  async findWithProducer(): Promise<Property[]> {
    return this.find({
      relations: ['producer'],
    });
  }

  async findByIdWithProducer(id: string): Promise<Property | null> {
    return this.findOne({
      where: { id },
      relations: ['producer'],
    });
  }

  async findById(id: string): Promise<Property | null> {
    return this.findOne({ where: { id } });
  }

  async createAndSave(dto: CreatePropertyDto, producer: Producer): Promise<Property> {
    const property = this.create({ ...dto, producer });
    return this.save(property);
  }

  async updateById(id: string, data: Partial<Property>): Promise<Property | null> {
    await this.update(id, data);
    return this.findById(id);
  }

  async removeById(property: Property): Promise<void> {
    await this.remove(property);
  }
}
