import { ObjectId } from "mongodb";
import { ProductProps } from "../../../../core/entities/product";
import ProductsRepository from "../../../../core/repositories/products-repository";
import { MongoHelper } from "../helpers/mongo-helper";
import { mapToProducts } from "./utils";

export class ProductsMongoRepository implements ProductsRepository {
  private readonly collectionName = "products";

  async findAll(): Promise<ProductProps[]> {
    const collection = MongoHelper.getCollection(this.collectionName);
    const response = await collection.find({}).toArray();
    return mapToProducts(response);
  }

  async findAllById(productsIds: string[]): Promise<ProductProps[]> {
    const collection = MongoHelper.getCollection(this.collectionName);
    const ids = productsIds.map((id) => new ObjectId(id));
    const response = await collection.find({ _id: { $in: ids } }).toArray();
    return mapToProducts(response);
  }
}
