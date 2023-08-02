import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import validator from 'validator';

type ProductDocument = HydratedDocument<Product>;

@Schema({
  versionKey: false,
  timestamps: true,
})
class Product {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  price: number;

  @Prop()
  stock: number;
}

const ProductSchema = SchemaFactory.createForClass(Product);

export { ProductDocument, Product, ProductSchema };
