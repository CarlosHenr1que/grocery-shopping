import { Product } from '../../../src/core/entities/product';

export default class ProductBuilder {
  private product: Product = Product.create({
    id: '680677cd575c799fe3d861e0',
    name: 'any_name',
    category: 'any_category',
    price: 1.2,
    stock: 2,
    imageUrl: 'any_url',
  });

  public build() {
    const productClone = this.product;
    return productClone;
  }
}
