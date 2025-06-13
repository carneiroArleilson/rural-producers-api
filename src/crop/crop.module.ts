import { Module } from '@nestjs/common';
import { CropController } from './crop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from './entities/crop.entity';
import { Property } from 'src/property/entities/property.entity';
import { CropRepository } from './crop.repository';
import { PropertyRepository } from 'src/property/property.repository';
import { CreateCropService } from './service/create-crop.service';
import { FindAllCropService } from './service/find-All-crop.service';
import { FindOneCropService } from './service/find-One-crop.service';
import { UpdateCropService } from './service/update-crop.service';
import { RemoveCropService } from './service/remove-crop.service';

@Module({
  imports: [TypeOrmModule.forFeature([Crop, Property])],
  controllers: [CropController],
  providers: [
    CreateCropService,
    FindAllCropService,
    FindOneCropService,
    UpdateCropService,
    RemoveCropService,
    CropRepository,
    PropertyRepository
  ],
})
export class CropModule {}
