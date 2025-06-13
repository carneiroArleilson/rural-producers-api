import { Module } from '@nestjs/common';
import { ProducerController } from './producer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producer } from './entities/producer.entity';
import { ProducerRepository } from './producer.repository';
import { CreateProducerService } from './service/create-producer.service';
import { FindAllProducerService } from './service/find-all-producer.service';
import { FindOneProducerService } from './service/find-one-producer.service';
import { UpdateProducerService } from './service/update-producer.service';
import { RemoveProducerService } from './service/remove-producer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Producer])],
  controllers: [ProducerController],
  providers: [
    CreateProducerService,
    FindAllProducerService,
    FindOneProducerService,
    UpdateProducerService,
    RemoveProducerService,
    ProducerRepository
  ],
  exports: [ProducerRepository],
})
export class ProducerModule {}
