import OrderRepository from "../core/repositories/order-repository";

export class GetOrders {
  constructor(private orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute() {
    const orders = await this.orderRepository.findAll();
    return orders;
  }
}
