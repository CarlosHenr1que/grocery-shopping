import { Order, OrderProps } from "../core/entities/order";
import { OrderMongoRepository } from "../infra/repositories/mongo/mongo-order-repository";

export class AddOrder {
  constructor(private orderRepository: OrderMongoRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(props: OrderProps) {
    const order = await this.orderRepository.create(Order.create(props));
    return order;
  }
}
