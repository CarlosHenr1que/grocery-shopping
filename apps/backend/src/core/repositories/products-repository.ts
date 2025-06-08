import { ProductProps } from "../entities/product";

export interface ProductsStock {
  id: ProductProps["id"];
  stock: ProductProps["stock"];
}
export default interface ProductsRepository {
  findAll(products: ProductProps): Promise<ProductProps[]>;
  findAllById(ids: string[]): Promise<ProductProps[]>;
  updateStock(items: { id: string; quantity: number }[]): Promise<void>;
}
