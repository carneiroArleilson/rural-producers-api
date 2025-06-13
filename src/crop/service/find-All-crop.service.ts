import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Crop } from '../entities/crop.entity';
import {
  CROP_FIND_FAILED,
} from 'src/utils/erros';
import { CropRepository } from '../crop.repository';

@Injectable()
export class FindAllCropService {
  constructor(
    private readonly cropRepository: CropRepository,
  ) {}

  async findAll(): Promise<Crop[]> {
    try {
      return await this.cropRepository.findAllWithProperty();
    } catch {
      throw new InternalServerErrorException(CROP_FIND_FAILED);
    }
  }
}
