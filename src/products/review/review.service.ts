import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewDto } from '../dto/review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async insertReview(id: number, body: ReviewDto) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (product) {
      const review = this.reviewRepository.create(body);
      review.product = product;
      return await this.reviewRepository.save(review);
    }
    throw new NotFoundException(`El producto con id ${id} no existe`);
  }
}
