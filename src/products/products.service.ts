import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 1,
      name: 'Vela aromática',
      description: 'Esta vela lanza ricos olores',
    },
    {
      id: 2,
      name: 'Vela aromática',
      description: 'Esta vela lanza ricos olores',
    },
  ];

  getAll() {
    return this.products;
  }

  getId(id: number) {
    return this.products.find((item) => item.id == id);
  }

  insert(body: any) {
    this.products = [
      ...this.products,
      {
        id: this.products.length + 1,
        name: body.name,
        description: body.description,
      },
    ];
  }

  update(id: number, body: any) {
    let product = {
      id,
      name: body.name,
      description: body.description,
    };
    this.products = this.products.map((item) =>
      item.id == id ? product : item,
    );
  }

  delete(id: number) {
    this.products = this.products.filter((item) => item.id != id);
  }
}
