import { ObjectId } from "mongodb";
import { Order } from "../../../core/entities/order";
import { ProductProps } from "../../../core/entities/product";
import ProductsRepository, {
  ProductsStock,
} from "../../../core/repositories/products-repository";
import { MongoHelper } from "./helpers/mongo-helper";

export class ProductsMongoRepository implements ProductsRepository {
  async findStock(order: Order): Promise<ProductsStock[]> {
    const productsIds = order.items.map(
      (i) => new ObjectId(String(i.productId)),
    );
    const productsCollection = MongoHelper.getCollection(this.collection);
    const stock = await productsCollection
      .find({ _id: { $in: productsIds } })
      .toArray();
    return stock.map((item) => ({
      id: item._id.toString(),
      stock: item.stock,
    }));
  }
  private readonly collection = "products";

  async findAll(): Promise<ProductProps[]> {
    const productsCollection = MongoHelper.getCollection(this.collection);
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
