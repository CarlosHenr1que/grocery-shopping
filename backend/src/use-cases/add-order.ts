import { Order, OrderProps } from "../core/entities/order";
import { ProductProps } from "../core/entities/product";
import OrderRepository from "../core/repositories/order-repository";
import ProductsRepository, {
  ProductsStock,
} from "../core/repositories/products-repository";
import { Either, left, right } from "../shared/either";
import { ProductNotFoundError } from "./erros/product-not-found";
import { UnavailableStockError } from "./erros/unavailable-stock";

type Errors = UnavailableStockError | ProductNotFoundError;

interface StockResponse extends ProductsStock {
  quantity: number;
}

export class AddOrder {
  constructor(
    private orderRepository: OrderRepository,
    private productsRepository: ProductsRepository,
  ) {
    this.orderRepository = orderRepository;
    this.productsRepository = productsRepository;
  }

  private filterOutOfStock = (order: Order, stock: ProductProps[]) => {
    const outOfStock: StockResponse[] = [];

    stock.forEach((item) => {
      const quantity = order.items.find(
        (i) => i.productId === item.id,
      ).quantity;

      if (quantity > item.stock) {
        outOfStock.push({
          id: item.id,
          quantity,
          stock: item.stock,
        });
      }
    });
    return outOfStock;
  };

  async execute(
    props: OrderProps,
  ): Promise<Either<{ stock?: StockResponse[]; error: Errors }, OrderProps>> {
    const order = Order.create(props);
    const ids = order.items.map((item) => item.productId);
    const products = await this.productsRepository.findAllById(ids);

    if (products.length !== order.items.length) {
      return left({ error: new ProductNotFoundError() });
    }

    const outOfStock = this.filterOutOfStock(order, products);

    if (outOfStock.length > 0) {
      return left({ stock: outOfStock, error: new UnavailableStockError() });
    }

    await this.productsRepository.updateStock(
      order.items.map((item) => ({
        id: item.productId,
        quantity: item.quantity,
      })),
    );
    const created = await this.orderRepository.create(order);
    return right(created);
  }
}
