import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getAll() {
    return 'Este es el listado productos';
  }

  @Get(':id/:category')
  findWithCategory(@Param() params) {
    return `El producto que quieres recibir es ${params.id} de ${params.category}`;
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return `El producto que quieres recibir es ${id}`;
  }

  @Post()
  create() {
    return 'Estás creando un producto';
  }
}
