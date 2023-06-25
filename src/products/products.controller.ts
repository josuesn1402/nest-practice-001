import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { ProductDto } from './dto/product.dto';
import { ProductPatchDto } from './dto/product-patch.dto';
import { QueryProductDto } from './dto/query-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll(
    // @Query() query
    // @Query('limit', ParseIntPipe) limit: number,
    @Query() query: QueryProductDto,
  ): Promise<Product[]> {
    const defaultQuery = {
      limit: 10,
      order: 'name',
      query: '',
    };
    query = { ...defaultQuery, ...query };
    return this.productsService.getAll(query);
  }

  @Get(':id/:category')
  findWithCategory(@Param() params) {
    return `El producto que quieres recibir es ${params.id} de ${params.category}`;
  }

  @Get(':id')
  find(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Product> {
    return this.productsService.getId(id);
  }

  @Post()
  // @UsePipes(new ValidationPipe())
  async create(@Body() body: ProductDto): Promise<Product> {
    return this.productsService.insert(body);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, body);
  }

  @Patch(':id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProductPatchDto,
  ): Promise<Product> {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  // @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
