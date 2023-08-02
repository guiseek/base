import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  Controller,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ServerStoreService } from './server-store.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('store')
@ApiBearerAuth()
@Controller('store')
@UseInterceptors(ClassSerializerInterceptor)
export class ServerStoreController {
  constructor(private readonly storeService: ServerStoreService) {}

  @Get('products')
  getAll() {
    return this.storeService.findAllProducts();
  }

  @Get('products/:id')
  getOne(@Param('id') id: string) {
    return this.storeService.findOneProduct(id);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Product created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request',
  })
  @Post('products')
  postOne(@Body() createProductDto: CreateProductDto) {
    return this.storeService.createOneProduct(createProductDto);
  }

  @Put('products/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product updated',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request',
  })
  putOne(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.storeService.updateOneProduct(id, updateProductDto);
  }

  @Delete('products/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product removed',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  deleteOne(@Param('id') id: string) {
    return this.storeService.removeOneProduct(id);
  }
}
