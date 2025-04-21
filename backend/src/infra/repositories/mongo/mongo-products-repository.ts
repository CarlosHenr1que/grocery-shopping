import { ProductProps } from "../../../core/entities/product";
import ProductsRepository from "../../../core/repositories/products-repository";
import { MongoHelper } from "./helpers/mongo-helper";

export class ProductsMongoRepository implements ProductsRepository {
  private readonly collection = "products";

  async findAll(): Promise<ProductProps[]> {
    const productsCollection = MongoHelper.getCollection(this.collection);
    console.log(productsCollection.find());
    const response = await productsCollection.find({}).toArray();
    return response.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      category: item.category,
      price: item.price,
      stock: item.stock,
      imageUrl: item.imageUrl,
    }));
  }
}
