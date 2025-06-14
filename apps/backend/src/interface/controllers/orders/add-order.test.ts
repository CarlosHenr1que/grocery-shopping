import { AddOrder, StockResponse } from '../../../use-cases/add-order';
import { AddOrderController } from './add-order';
import { OrderMongoRepository } from '../../../infra/repositories/mongo/mongo-order-repository';
import { ProductsMongoRepository } from '../../../infra/repositories/mongo/products/mongo-products-repository';
import { left, right } from '../../../shared/either';
import { OrderProps } from '../../../core/entities/order';
import { ProductNotFoundError } from '../../../use-cases/erros/product-not-found';
import { UnavailableStockError } from '../../../use-cases/erros/unavailable-stock';

const orderProps: OrderProps = {
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
};

const makeSut = () => {
  const orderRepository = new OrderMongoRepository();
  const productsRepository = new ProductsMongoRepository();
  const addOrder = new AddOrder(orderRepository, productsRepository);
  const sut = new AddOrderController(addOrder);
  return { sut, addOrder, orderRepository };
};
describe('Add order controller', () => {
  it('should return 201 when order is created', async () => {
    const { sut, addOrder } = makeSut();
    jest.spyOn(addOrder, 'execute').mockResolvedValueOnce(right(orderProps));
    const response = await sut.handle({});
    expect(response).toStrictEqual({
      statusCode: 201,
      body: orderProps,
    });
  });

  it('should 400 with unavailable stock error', async () => {
    const { sut, addOrder } = makeSut();
    const error = new UnavailableStockError();
    const stock: StockResponse[] = [
      {
        quantity: 1,
        id: 'any',
        stock: 0,
      },
    ];

    jest
      .spyOn(addOrder, 'execute')
      .mockResolvedValueOnce(left({ error, stock }));
    const response = await sut.handle({});
    expect(response).toStrictEqual({
      statusCode: 400,
      body: {
        data: stock,
        message: error.message,
      },
    });
  });

  it('should 400 with product not found error', async () => {
    const { sut, addOrder } = makeSut();
    const error = new ProductNotFoundError();
    jest.spyOn(addOrder, 'execute').mockResolvedValueOnce(left({ error }));
    const response = await sut.handle({});
    expect(response).toStrictEqual({
      statusCode: 400,
      body: {
        message: error.message,
      },
    });
  });

  it('should 500 with error', async () => {
    const { sut, addOrder } = makeSut();
    const error = new Error('error');
    jest.spyOn(addOrder, 'execute').mockRejectedValue(error);
    const response = await sut.handle({});
    expect(response).toStrictEqual({
      statusCode: 500,
      body: error.message,
    });
  });
});
