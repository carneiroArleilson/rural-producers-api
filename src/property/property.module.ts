import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Producer } from 'src/producer/entities/producer.entity';
import { PropertyRepository } from './property.repository';
import { CreatePropertyService } from './service/create-property.service';
import { FindAllPropertyService } from './service/find-all-property.service';
import { FindOnePropertyService } from './service/find-one-property.service';
import { UpdatePropertyService } from './service/update-property.service';
import { RemovePropertyService } from './service/remove-property.service';
import { ProducerModule } from 'src/producer/producer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property, Producer]),
    ProducerModule
  ],
  controllers: [PropertyController],
  providers: [
    CreatePropertyService,
    FindAllPropertyService,
    FindOnePropertyService,
    UpdatePropertyService,
    RemovePropertyService,
    PropertyRepository
  ],
})
export class PropertyModule {}
