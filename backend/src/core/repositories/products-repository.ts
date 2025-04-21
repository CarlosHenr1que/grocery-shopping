import { ProductProps } from "../entities/product";

export default interface ProductsRepository {
  findAll(): Promise<ProductProps[]>;
}
