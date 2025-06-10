import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Producer } from 'src/producer/entities/producer.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,

    @InjectRepository(Producer)
    private readonly producerRepository: Repository<Producer>,
  ) {}

  async create(dto: CreatePropertyDto): Promise<Property> {
    const producer = await this.producerRepository.findOneBy({
      id: dto.producerId,
    });

    if (!producer) {
      throw new NotFoundException(`Produtor com ID ${dto.producerId} não encontrado`);
    }

    const total = dto.totalArea;
    const somaAreas = dto.agriculturalArea + dto.vegetationArea;

    if (somaAreas > total) {
      throw new BadRequestException(
        'A soma das áreas agrícola e de vegetação não pode ultrapassar a área total',
      );
    }

    const property = this.propertyRepository.create({ ...dto, producer });
    return this.propertyRepository.save(property);
  }

  async findAll(): Promise<Property[]> {
    return this.propertyRepository.find({
      relations: ['producer'],
    });
  }

  async findOne(id: string): Promise<Property> {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: ['producer'],
    });

    if (!property) {
      throw new NotFoundException(`Propriedade com ID ${id} não encontrada`);
    }

    return property;
  }

  async update(id: string, dto: UpdatePropertyDto): Promise<Property> {
    const property = await this.findOne(id);

    const newTotal = dto.totalArea ?? property.totalArea;
    const newAgri = dto.agriculturalArea ?? property.agriculturalArea;
    const newVeg = dto.vegetationArea ?? property.vegetationArea;

    if (newAgri + newVeg > newTotal) {
      throw new BadRequestException(
        'A soma das áreas agrícola e de vegetação não pode ultrapassar a área total',
      );
    }

    Object.assign(property, dto);
    return this.propertyRepository.save(property);
  }

  async remove(id: string): Promise<void> {
    const result = await this.propertyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Propriedade com ID ${id} não encontrada`);
    }
  }
}