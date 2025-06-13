import { Crop } from 'src/crop/entities/crop.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCropDto } from '../dto/update-crop.dto';
import {
  CROP_NOT_FIND,
  CROP_UPDATE_FAILED
} from 'src/utils/erros';
import { CropRepository } from '../crop.repository';

@Injectable()
export class UpdateCropService {
  constructor(
    private readonly cropRepository: CropRepository,
  ) {}
  async update(id: string, dto: UpdateCropDto): Promise<Crop | null> {
    try {
      const crop = await this.cropRepository.findByIdWithProperty(id);
      if (!crop) throw new NotFoundException(CROP_NOT_FIND);
      return await this.cropRepository.updateById(id, dto);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(CROP_UPDATE_FAILED);
    }
  }
}
