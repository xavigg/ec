import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async find(@Req() request: Request): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':idproduct')
  async findById(@Param('idproduct') idproduct: number): Promise<Product> {
    return this.productsService.findById(idproduct);
  }

  @Get('/brand/:brand')
  async findByBrand(@Param('brand') brand: string) {
    return this.productsService.findByBrand(brand);
  }

  @Get('/category/:category')
  async findByCategory(@Param('category') category: string) {
    return this.productsService.findByCategory(category);
  }

  @Patch(':idproduct')
  async update(
    @Param('idproduct') idproduct: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(idproduct, updateProductDto);
  }

  @Delete(':idproduct')
  async remove(@Param('idproduct') idproduct: number) {
    return this.productsService.remove(idproduct);
  }
}