import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductDto } from './dto/product.dto';
import { ProductPatchDto } from './dto/product-patch.dto';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from './entities/size.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
  ) {}

  getAll(limit: number): Promise<Product[]> {
    return this.productRepository.find({
      take: limit,
      /*
      -- LLama la selección junto con las tablas relaciones
      --
      relations: ['sizes', 'reviews', 'reviews.product'], 
      --
      */
      /*
      -- Los que coincidan con el id 2
      --
      where: { id: 2 }, 
      --
      */
      /* 
      -- Los que tengan stock igual a 33
      --
      where: { stock: 33 }, 
      --
      */
      /* 
      -- 
      take: 2, // Limita la cantidad de registros devuelta
      order: { id: 'DESC' }, // Ordena pro id de manera descendente
      where: [{ stock: 33 }, { name: 'Silla victoriana', stock: 34 }],
      --
      */
      /*
      -- Seleciona en orden descendente las filas que tengan 'silla' dentro del nombre
      -- 
      where: { name: Like('%silla%') },
      order: { id: 'DESC' },
      --
      */
      /*
      --
      --
      take: 3,
      order: {
        name: 'ASC',
        stock: 'DESC',
      },
      skip: 3, // Salta los 3 primeros resultados 
      --
      */
      /*
      -- Busca los que tengan un stock mayor a 33 y contengan en su nombre una letra 'p'
      --
      where: { stock: MoreThan(33), name: Like('%p%') },
      --
      */
    });
  }

  async getId(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (product) {
      return product;
    }
    throw new NotFoundException(`No  puedo encontrar ese producto`);
  }

  async insert(body: ProductDto): Promise<Product> {
    const sizes = await Promise.all(
      body.sizes.map((size) => this.selectOrCreateSize(size)),
    );
    const product = this.productRepository.create({ ...body, sizes });
    await this.productRepository.save(product);
    return product;
  }

  async update(
    id: number,
    body: ProductDto | ProductPatchDto,
  ): Promise<Product> {
    const sizes =
      body.sizes &&
      (await Promise.all(
        body.sizes.map((size) => this.selectOrCreateSize(size)),
      ));
    const inputProduct = {
      id,
      ...body,
      sizes,
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

  private async selectOrCreateSize(size: string): Promise<Size> {
    const sizeEntity = await this.sizeRepository.findOne({
      where: { size: size },
    });
    if (sizeEntity) {
      return sizeEntity;
    }
    return this.sizeRepository.create({
      size: size,
    } as DeepPartial<Size>);
  }
}
