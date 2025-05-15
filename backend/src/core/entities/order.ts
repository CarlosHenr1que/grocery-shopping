/* eslint-disable @typescript-eslint/no-explicit-any */

import { Product } from "./product";

interface Item {
  id: string;
  quantity: number;
  product: Product;
}
export interface OrderProps {
  id?: string;
  userId: string;
  items: Item[];
}

export class Order {
  public readonly id: string | undefined;
  public readonly userId: string;
  public readonly items: Item[];

  private constructor(id: string | undefined, userId: string, items: Item[]) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    Object.freeze(this);
  }

  static create(props: OrderProps) {
    return new Order(props.id, props.userId, props.items);
  }
}
