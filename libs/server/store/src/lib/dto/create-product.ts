import { IsNumber, IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  images: string[];

  @IsNumberString()
  @ApiProperty()
  price: number;

  @ApiProperty()
  discountPercentage: number;

  @ApiProperty()
  rating: number;

  @IsNumber()
  @ApiProperty()
  stock: number;
}
