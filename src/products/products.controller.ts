import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Get(':id/:category')
  findWithCategory(@Param() params) {
    return `El producto que quieres recibir es ${params.id} de ${params.category}`;
  }

  @Get(':id')
  find(@Res() response, @Param('id') id: number) {
    let product = this.productsService.getId(id);
    if (product) {
      return response.status(HttpStatus.OK).send(product);
    } else {
      return response
        .status(HttpStatus.NOT_FOUND)
        .send('No he encontrado ese producto');
    }
  }

  @Post()
  create(@Body() body) {
    this.productsService.insert(body);
    return `Insertado`;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body) {
    this.productsService.update(id, body);
    return `Actualizado`;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.productsService.delete(id);
    return `Borrado`;
  }
}
