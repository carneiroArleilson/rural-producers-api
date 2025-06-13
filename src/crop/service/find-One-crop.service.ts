import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Crop } from '../entities/crop.entity';
import {
  CROP_FIND_FAILED,
  CROP_NOT_FIND
} from 'src/utils/erros';
import { CropRepository } from '../crop.repository';

@Injectable()
export class FindOneCropService {
  constructor(
    private readonly cropRepository: CropRepository,
  ) {}

  async findOne(id: string): Promise<Crop> {
    try {
      const crop = await this.cropRepository.findByIdWithProperty(id);
      if (!crop) throw new NotFoundException(CROP_NOT_FIND);
      return crop;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(CROP_FIND_FAILED);
    }
  }
}
