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
} from '@nestjs/common';

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

  /* @Post()
  create(@Body() body) {
    return `Estás creando un producto ${body.name} con el texto ${body.description}`;
  } */

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body('name') name: string, @Body('description') description: string) {
    return `Estás creando un producto ${name} con el texto ${description}.`;
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('description') description: string,
  ) {
    return `Estas actualizando el producto ${id}, colocando los datos ${name} con texto ${description}`;
  }

  @Delete(':id')
  // @HttpCode(204)
  remove(@Param('id') id: number) {
    // Levantar excepción
    throw new BadRequestException('No se puede hacer delete');
    return `Estás borrando el producto ${id}`;
  }
}
