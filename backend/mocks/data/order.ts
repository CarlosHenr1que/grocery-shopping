/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from "../../src/core/entities/order";

export default class OrderBuilder {
  private order: Order = Order.create({
    id: "any_id",
    userId: "any_user_id",
    items: [
      {
        productId: "680677cd575c799fe3d861e0",
        quantity: 2,
      },
    ],
  });

  private update(props: any) {
    return Order.create({ ...this.order, ...props });
  }

  public setItems(items: any[]) {
    this.order = this.update({ ...this.order, items });
    return this;
  }

  public build() {
    const orderClone = this.order;
    return orderClone;
  }
}
