import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CROP_NOT_FIND,
  CROP_REMOVE_FAILED
} from 'src/utils/erros';
import { CropRepository } from '../crop.repository';

@Injectable()
export class RemoveCropService {
  constructor(
    private readonly cropRepository: CropRepository,
  ) {}

  async remove(id: string): Promise<void> {
    try {
      const crop = await this.cropRepository.findByIdWithProperty(id);
      if (!crop) throw new NotFoundException(CROP_NOT_FIND);
      await this.cropRepository.removeByEntity(crop);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(CROP_REMOVE_FAILED);
    }
  }
}
