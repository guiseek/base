import { CreateProductDto, UpdateProductDto, ProductResponseDto } from './dto';
import { Product } from './schemas/product';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ServerStoreService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async findAllProducts() {
    const products = await this.productModel.find();
    return products.map((product) => {
      return new ProductResponseDto(product.toJSON());
    });
  }

  async findOneProduct(id: string) {
    return this.productModel.findById(id);
  }

  async findOneProductBy<K extends keyof Product>(key: K, value: Product[K]) {
    return this.productModel.findOne({ [key]: value });
  }

  async createOneProduct(createProductDto: CreateProductDto) {
    const product = this.productModel.create(createProductDto);
    return product.then((product) => product.toJSON());
  }

  async updateOneProduct(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  async removeOneProduct(id: string) {
    return this.productModel.findByIdAndRemove(id);
  }
}
