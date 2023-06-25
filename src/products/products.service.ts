import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductDto } from './dto/product.dto';
import { ProductPatchDto } from './dto/product-patch.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  private products: Product[] = [
    {
      id: 1,
      name: 'Vela aromática',
      description: 'Esta vela lanza ricos olores',
      stock: 0,
    },
    {
      id: 2,
      name: 'Marco de fotos pequeño',
      description: 'Marco ideal para tus fotos 10x15',
      stock: 12,
    },
  ];

  getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getId(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (product) {
      return product;
    }
    throw new NotFoundException(`No  puedo encontrar ese producto`);
  }

  async insert(body: ProductDto): Promise<Product> {
    const product = this.productRepository.create(body);
    await this.productRepository.save(product);
    return product;
  }

  async update(
    id: number,
    body: ProductDto | ProductPatchDto,
  ): Promise<Product> {
    const inputProduct = {
      id,
      ...body,
    };
    const product = await this.productRepository.preload(inputProduct);
    if (product) {
      return this.productRepository.save(product);
    }
    throw new NotFoundException(`No he encontrado el producto con id ${id}`);
  }

  async delete(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (product) {
      await this.productRepository.remove(product);
      return;
    }
    throw new NotFoundException(`No he encontrado el producto con id ${id}`);
  }
}
