import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { CreateCropService } from './service/create-crop.service';
import { FindAllCropService } from './service/find-All-crop.service';
import { FindOneCropService } from './service/find-One-crop.service';
import { UpdateCropService } from './service/update-crop.service';
import { RemoveCropService } from './service/remove-crop.service';

@Controller('crops')
export class CropController {
  constructor(
    private readonly createCropService: CreateCropService,
    private readonly findAllCropService: FindAllCropService,
    private readonly findOneCropService: FindOneCropService,
    private readonly updateCropService: UpdateCropService,
    private readonly removeCropService: RemoveCropService,
  ) {}

  @Post()
  create(@Body() dto: CreateCropDto) {
    return this.createCropService.create(dto);
  }

  @Get()
  findAll() {
    return this.findAllCropService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneCropService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCropDto) {
    return this.updateCropService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeCropService.remove(id);
  }
}

