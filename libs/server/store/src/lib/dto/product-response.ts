import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../interfaces';

export class ProductResponseDto implements Product {
  @Expose({ name: 'id' })
  @Transform(({ value }) => String(value))
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

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

  @ApiProperty()
  price: number;

  @ApiProperty()
  discountPercentage: number;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  stock: number;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
