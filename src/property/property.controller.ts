import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreatePropertyService } from './service/create-property.service';
import { FindAllPropertyService } from './service/find-all-property.service';
import { FindOnePropertyService } from './service/find-one-property.service';
import { UpdatePropertyService } from './service/update-property.service';
import { RemovePropertyService } from './service/remove-property.service';

@Controller('property')
export class PropertyController {
  constructor(
    private readonly createPropertyService: CreatePropertyService,
    private readonly findAllPropertyService: FindAllPropertyService,
    private readonly findOnePropertyService: FindOnePropertyService,
    private readonly updatePropertyService: UpdatePropertyService,
    private readonly removePropertyService: RemovePropertyService,
  ) {}

  @Post()
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.createPropertyService.create(createPropertyDto);
  }

  @Get()
  findAll() {
    return this.findAllPropertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOnePropertyService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatePropertyDto,
  ) {

    return this.updatePropertyService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removePropertyService.remove(id);
  }
}