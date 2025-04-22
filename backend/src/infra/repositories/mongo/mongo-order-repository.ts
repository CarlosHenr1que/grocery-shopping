import { Order, OrderProps } from "../../../core/entities/order";
import OrderRepository from "../../../core/repositories/order-repository";
import { MongoHelper } from "./helpers/mongo-helper";

export class OrderMongoRepository implements OrderRepository {
  private readonly collection = "orders";
  async create(props: Order): Promise<OrderProps> {
    const orderCollection = MongoHelper.getCollection(this.collection);
    const { insertedId } = await orderCollection.insertOne(props);
    const order = { ...props, id: insertedId.toString() };
    return order;
  }
}
