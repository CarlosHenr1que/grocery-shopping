import { Order, OrderProps } from "../entities/order";

export default interface OrderRepository {
  create(order: Order): Promise<OrderProps>;
}
