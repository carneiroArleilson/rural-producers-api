import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UpdatePropertyDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  state?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  totalArea?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  agriculturalArea?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  vegetationArea?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  producerId?: string;
}
