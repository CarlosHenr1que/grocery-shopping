import OrderBuilder from '../mocks/data/order';
import { OrderMongoRepository } from '../infra/repositories/mongo/mongo-order-repository';

import { GetOrders } from './get-orders';

const makeSut = () => {
  const orderRepository = new OrderMongoRepository();
  const sut = new GetOrders(orderRepository);
  return { sut, orderRepository };
};

describe(`Get orders use case`, () => {
  test('should return orders', async () => {
    const { sut, orderRepository } = makeSut();
    const orderMock = new OrderBuilder().build();
    jest.spyOn(orderRepository, 'findAll').mockResolvedValueOnce([orderMock]);
    const response = await sut.execute();
    expect(response).toStrictEqual([orderMock]);
  });
});
