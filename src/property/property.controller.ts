import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    const { totalArea, agriculturalArea, vegetationArea } = createPropertyDto;

    if (agriculturalArea + vegetationArea > totalArea) {
      throw new BadRequestException(
        'A soma das áreas agrícola e de vegetação não pode ultrapassar a área total.',
      );
    }

    return this.propertyService.create(createPropertyDto);
  }

  @Get()
  findAll() {
    return this.propertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatePropertyDto,
  ) {
    const { totalArea, agriculturalArea, vegetationArea } = updateDto;

    if (
      totalArea !== undefined &&
      agriculturalArea !== undefined &&
      vegetationArea !== undefined &&
      agriculturalArea + vegetationArea > totalArea
    ) {
      throw new BadRequestException(
        'A soma das áreas agrícola e de vegetação não pode ultrapassar a área total.',
      );
    }

    return this.propertyService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyService.remove(id);
  }
}