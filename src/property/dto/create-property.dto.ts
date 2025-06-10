import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  @Min(0)
  totalArea: number;

  @IsNumber()
  @Min(0)
  agriculturalArea: number;

  @IsNumber()
  @Min(0)
  vegetationArea: number;

  @IsString()
  @IsNotEmpty()
  producerId: string;
}