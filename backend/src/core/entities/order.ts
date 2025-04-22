/* eslint-disable @typescript-eslint/no-explicit-any */
export interface OrderProps {
  id?: string;
  userId: string;
  items: any[];
}

export class Order {
  public readonly id: string | undefined;
  public readonly userId: string;
  public readonly items: any[];

  private constructor(id: string | undefined, userId: string, items: any[]) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    Object.freeze(this);
  }

  static create(props: OrderProps) {
    return new Order(props.id, props.userId, props.items);
  }
}
