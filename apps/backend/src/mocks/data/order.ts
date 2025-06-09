import { Order } from '../../../src/core/entities/order';

export default class OrderBuilder {
  private order: Order = Order.create({
    id: 'any_id',
    userId: 'any_user_id',
    items: [
      {
        id: '680677cd575c799fe3d861e0',
        quantity: 2,
        product: {
          id: '680677cd575c799fe3d861e0',
          name: 'any_name',
          category: 'any_category',
          price: 1,
          stock: 1,
          imageUrl: 'any_urlS',
        },
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
