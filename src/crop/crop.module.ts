import { Module } from '@nestjs/common';
import { CropService } from './crop.service';
import { CropController } from './crop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from './entities/crop.entity';
import { Property } from 'src/property/entities/property.entity';
import { CropRepository } from './crop.repository';
import { PropertyRepository } from 'src/property/property.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Crop, Property])],
  controllers: [CropController],
  providers: [
    CropService,
    CropRepository,
    PropertyRepository
  ],
})
export class CropModule {}
