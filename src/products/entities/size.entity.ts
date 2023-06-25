import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity('sizes')
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 5 })
  size: string;

  @ManyToMany(() => Product, (product) => product.sizes)
  products: Product[];
}
