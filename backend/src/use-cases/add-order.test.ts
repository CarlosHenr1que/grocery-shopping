import { OrderProps } from "../core/entities/order";
import { OrderMongoRepository } from "../infra/repositories/mongo/mongo-order-repository";
import { AddOrder } from "./add-order";

const makeSut = () => {
  const orderRepository = new OrderMongoRepository();
  const sut = new AddOrder(orderRepository);
  return { sut, orderRepository };
};

const order: OrderProps = {
  id: "1",
  userId: "1",
  items: [
    {
      productId: "3",
      quantity: 2,
    },
    {
      productId: "2",
      quantity: 1,
    },
  ],
};

describe(`Add order use case`, () => {
  test("should create an order given proper attributes ", async () => {
    const { sut, orderRepository } = makeSut();
    jest.spyOn(orderRepository, "create").mockResolvedValueOnce(order);
    const response = await sut.execute(order);

    expect(response).toStrictEqual(order);
  });
});
