import { ProductsMongoRepository } from "../infra/repositories/mongo/products/mongo-products-repository";

export class GetProducts {
  constructor(private productsRepository: ProductsMongoRepository) {
    this.productsRepository = productsRepository;
  }

  async execute() {
    return await this.productsRepository.findAll();
  }
}
