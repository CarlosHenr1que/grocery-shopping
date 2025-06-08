import { Order } from '../core/entities/order';
import { Product, ProductProps } from '../core/entities/product';
import OrderRepository from '../core/repositories/order-repository';
import ProductsRepository, {
  ProductsStock,
} from '../core/repositories/products-repository';
import { Either, left, right } from '../shared/either';
import { ProductNotFoundError } from './erros/product-not-found';
import { UnavailableStockError } from './erros/unavailable-stock';

type Errors = UnavailableStockError | ProductNotFoundError;

interface StockResponse extends ProductsStock {
  quantity: number;
}

interface Item {
  id: string;
  quantity: number;
}

interface OrderProps {
  id?: string;
  userId: string;
  items: Item[];
}

export class AddOrder {
  constructor(
    private orderRepository: OrderRepository,
    private productsRepository: ProductsRepository
  ) {
    this.orderRepository = orderRepository;
    this.productsRepository = productsRepository;
  }

  private filterOutOfStock = (order: Order, stock: ProductProps[]) => {
    const outOfStock: StockResponse[] = [];

    stock.forEach((item) => {
      const quantity = order.items.find((i) => i.id === item.id)?.quantity;

      if (quantity && quantity > item.stock) {
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
    props: OrderProps
  ): Promise<Either<{ stock?: StockResponse[]; error: Errors }, OrderProps>> {
    const ids = props.items.map((item) => item.id);
    const products = await this.productsRepository.findAllById(ids as string[]);

    if (products.length !== props.items.length) {
      return left({ error: new ProductNotFoundError() });
    }

    const order = Order.create({
      ...props,
      items: props.items.map((item) => {
        const product = products.find((product) => product.id === item.id);

        if (!product) {
          throw new Error();
        }

        return { ...item, product: Product.create(product) };
      }),
    });

    const outOfStock = this.filterOutOfStock(order, products);

    if (outOfStock.length > 0) {
      return left({ stock: outOfStock, error: new UnavailableStockError() });
    }

    await this.productsRepository.updateStock(
      order.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }))
    );
    const created = await this.orderRepository.create(order);
    return right(created);
  }
}
