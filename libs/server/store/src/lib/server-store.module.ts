import { Module } from '@nestjs/common';
import { ServerStoreController } from './server-store.controller';
import { ServerStoreService } from './server-store.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ServerStoreController],
  providers: [ServerStoreService],
  exports: [ServerStoreService],
})
export class ServerStoreModule {}
