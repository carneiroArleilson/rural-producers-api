import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { CreateProducerService } from './service/create-producer.service';
import { FindAllProducerService } from './service/find-all-producer.service';
import { FindOneProducerService } from './service/find-one-producer.service';
import { UpdateProducerService } from './service/update-producer.service';
import { RemoveProducerService } from './service/remove-producer.service';

@Controller('producer')
export class ProducerController {
  constructor(
    private readonly createProducerService: CreateProducerService,
    private readonly findAllProducerService: FindAllProducerService,
    private readonly findOneProducerService: FindOneProducerService,
    private readonly updateProducerService: UpdateProducerService,
    private readonly removeProducerService: RemoveProducerService,
  ) {}

  @Post()
  create(@Body() createProducerDto: CreateProducerDto) {
    return this.createProducerService.create(createProducerDto);
  }

  @Get()
  findAll() {
    return this.findAllProducerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneProducerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProducerDto: UpdateProducerDto) {
    return this.updateProducerService.update(id, updateProducerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeProducerService.remove(id);
  }
}
