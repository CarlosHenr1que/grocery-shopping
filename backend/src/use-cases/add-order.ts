import { Order, OrderProps } from "../core/entities/order";
import ProductsRepository, {
  ProductsStock,
} from "../core/repositories/products-repository";
import { OrderMongoRepository } from "../infra/repositories/mongo/mongo-order-repository";
import { Either, left, right } from "../shared/either";
import { UnavailableStockError } from "./erros/unavailable-stock";

type Errors = UnavailableStockError;

interface StockResponse extends ProductsStock {
  quantity: number;
}

export class AddOrder {
  constructor(
    private orderRepository: OrderMongoRepository,
    private productsRepository: ProductsRepository,
  ) {
    this.orderRepository = orderRepository;
    this.productsRepository = productsRepository;
  }

  private filterOutOfStock = (order: Order, stock: ProductsStock[]) => {
    const outOfStock: StockResponse[] = [];

    stock.forEach((item) => {
      const quantity = order.items.find(
        (i) => i.productId === item.id,
      ).quantity;

      if (quantity > item.stock) {
        outOfStock.push({
          ...item,
          quantity,
        });
      }
    });
    return outOfStock;
  };

  async execute(
    props: OrderProps,
  ): Promise<Either<{ stock: StockResponse[]; error: Errors }, OrderProps>> {
    const order = Order.create(props);
    const stock = await this.productsRepository.findStock(order);

    const outOfStock = this.filterOutOfStock(order, stock);

    if (outOfStock.length > 0) {
      return left({ stock: outOfStock, error: new UnavailableStockError() });
    }

    const created = await this.orderRepository.create(Order.create(props));
    return right(created);
  }
}
