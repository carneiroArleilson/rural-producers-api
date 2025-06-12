import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Producer } from 'src/producer/entities/producer.entity';
import { PropertyRepository } from './property.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Producer])],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyRepository],
})
export class PropertyModule {}
