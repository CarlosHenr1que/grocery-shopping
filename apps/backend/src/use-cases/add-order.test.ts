import OrderBuilder from '../mocks/data/order';
import ProductBuilder from '../mocks/data/product';
import { OrderMongoRepository } from '../infra/repositories/mongo/mongo-order-repository';
import { ProductsMongoRepository } from '../infra/repositories/mongo/products/mongo-products-repository';
import { AddOrder } from './add-order';
import { ProductNotFoundError } from './erros/product-not-found';
import { UnavailableStockError } from './erros/unavailable-stock';
import { socketServer } from '../interface/http/socket';

jest.mock('../interface/http/socket', () => ({
  socketServer: {
    getIO: jest.fn().mockReturnValue({
      emit: jest.fn(),
    }),
  },
}));

const makeSut = () => {
  const orderRepository = new OrderMongoRepository();
  const productsRepository = new ProductsMongoRepository();
  const sut = new AddOrder(orderRepository, productsRepository);
  return { sut, orderRepository, productsRepository };
};

describe(`Add order use case`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create an order given proper attributes and emit socket event', async () => {
    const { sut, orderRepository, productsRepository } = makeSut();
    const orderMock = new OrderBuilder().build();
    const productMock = new ProductBuilder().build();

    jest.spyOn(productsRepository, 'updateStock').mockResolvedValueOnce();
    jest.spyOn(orderRepository, 'create').mockResolvedValueOnce(orderMock);
    jest
      .spyOn(productsRepository, 'findAllById')
      .mockResolvedValueOnce([productMock]);

    const response = await sut.execute(orderMock);

    expect(response.value).toStrictEqual(orderMock);
    expect(socketServer.getIO().emit).toHaveBeenCalledWith('order_received', {
      order: orderMock,
      timestamp: expect.any(String),
    });
  });

  test('should return unavailable stock given a order with out of stock product', async () => {
    const { sut, orderRepository, productsRepository } = makeSut();
    const productMock = new ProductBuilder().build();
    const orderMock = new OrderBuilder()
      .setItems([
        {
          id: productMock.id,
          quantity: productMock.stock + 1,
          product: productMock,
        },
      ])
      .build();

    jest.spyOn(orderRepository, 'create').mockResolvedValueOnce(orderMock);
    jest
      .spyOn(productsRepository, 'findAllById')
      .mockResolvedValueOnce([productMock]);

    const response = await sut.execute(orderMock);

    expect(response.value).toStrictEqual({
      error: new UnavailableStockError(),
      stock: [
        {
          id: productMock.id,
          stock: productMock.stock,
          quantity: productMock.stock + 1,
        },
      ],
    });
    expect(socketServer.getIO().emit).not.toHaveBeenCalled();
  });

  test('should return product not found error when given product does not exist', async () => {
    const { sut, orderRepository, productsRepository } = makeSut();
    const productMock = new ProductBuilder().build();
    const orderMock = new OrderBuilder()
      .setItems([
        { productId: productMock.id, quantity: productMock.stock + 1 },
      ])
      .build();

    jest.spyOn(orderRepository, 'create').mockResolvedValueOnce(orderMock);
    jest.spyOn(productsRepository, 'findAllById').mockResolvedValueOnce([]);

    const response = await sut.execute(orderMock);

    expect(response.value).toStrictEqual({
      error: new ProductNotFoundError(),
    });
    expect(socketServer.getIO().emit).not.toHaveBeenCalled();
  });

  test('should throw if products length doest not match', async () => {
    const { sut, orderRepository, productsRepository } = makeSut();
    const orderMock = new OrderBuilder().build();
    const productMock = new ProductBuilder().build();

    jest.spyOn(productsRepository, 'updateStock').mockResolvedValueOnce();
    jest.spyOn(orderRepository, 'create').mockResolvedValueOnce(orderMock);
    jest
      .spyOn(productsRepository, 'findAllById')
      .mockResolvedValueOnce([productMock]);

    const promise = sut.execute({
      ...orderMock,
      items: [{ ...orderMock.items[0], id: 'any' }],
    });

    await expect(promise).rejects.toThrow();
    expect(socketServer.getIO().emit).not.toHaveBeenCalled();
  });
});
