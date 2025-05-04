import { Order } from "../entities/order";
import { ProductProps } from "../entities/product";

export interface ProductsStock {
  id: ProductProps["id"];
  stock: ProductProps["stock"];
}
export default interface ProductsRepository {
  findAll(products: ProductProps): Promise<ProductProps[]>;
  findStock(order: Order): Promise<ProductsStock[]>;
}
