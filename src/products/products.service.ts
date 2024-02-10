import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return this.productsRepository.save(createProductDto);
    } catch (error) {
      throw new ServiceUnavailableException(
        error + ' / Could not connect to the DB',
      );
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      let products = await this.productsRepository.find({
        relations: ['category', 'brand'],
        select: {
          category: {
            name: true,
          },
          brand: {
            name: true,
          },
        },
      });

      if (!products.length) {
        throw new ServiceUnavailableException('Error - No documents found');
      }
      return products;
    } catch (error) {
      throw new ServiceUnavailableException(error);
    }
  }

  async findById(idproduct: number): Promise<Product> {
    try {
      let product = await this.productsRepository.findOne({
        where: {
          idproduct: idproduct,
        },
        relations: ['category', 'brand'],
        select: {
          category: {
            name: true,
          },
          brand: {
            name: true,
          },
        },
      });

      if (!product) {
        throw new ServiceUnavailableException('Error - No product found');
      }
      return product;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findByBrand(brand: string): Promise<Product[]> {
    try {
      const products = await this.productsRepository.find({
        where: {
          brand: { name: brand.toUpperCase() },
        },
        relations: ['category', 'brand'],
        select: {
          category: {
            name: true,
          },
          brand: {
            name: true,
          },
        },
      });
      if (!products.length) {
        throw new ServiceUnavailableException('Error: No documents found');
      }
      return products;
    } catch (error) {
      return error;
    }
  }

  async findByCategory(category: string): Promise<Product[]> {
    try {
      const products = await this.productsRepository.find({
        where: {
          category: { name: category.toUpperCase() },
        },
        relations: ['category', 'brand'],
        select: {
          category: {
            name: true,
          },
          brand: {
            name: true,
          },
        },
      });
      if (!products.length) {
        throw new ServiceUnavailableException('Error: No documents found');
      }
      return products;
    } catch (error) {
      return error;
    }
  }

  async update(
    idproduct: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      let toUpdate = await this.productsRepository.findOne({
        where: { idproduct: idproduct },
      });
      let updated = Object.assign(toUpdate, updateProductDto);
      return this.productsRepository.save(updated);
    } catch (error) {
      throw new BadRequestException('Product ID was incorrectly formatted');
    }
  }

  async remove(idproduct: number): Promise<any> {
    try {
      return await this.productsRepository.delete({ idproduct: idproduct });
    } catch (error) {
      throw new BadRequestException('Product ID was incorrectly formatted');
    }
  }
}