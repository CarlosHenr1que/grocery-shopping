import { Order, OrderProps } from "../../../core/entities/order";
import { MongoHelper } from "./helpers/mongo-helper";
import { OrderMongoRepository } from "./mongo-order-repository";

const makeSut = () => {
  const sut = new OrderMongoRepository();
  return { sut };
};

const order: OrderProps = {
  id: "1",
  userId: "2",
  items: [
    {
      id: "3",
      quantity: 2,
      product: {
        id: "3",
        name: "any_name",
        category: "any_category",
        price: 1,
        stock: 1,
        imageUrl: "any_url",
      },
    },
    {
      id: "2",
      quantity: 1,
      product: {
        id: "2",
        name: "any_name",
        category: "any_category",
        price: 1,
        stock: 1,
        imageUrl: "any_url",
      },
    },
  ],
};

const mockInsertOne = {
  insertOne: jest.fn().mockReturnValue({
    insertedId: { toString: () => "1" },
  }),
} as never;

const mockFindAll = {
  find: jest.fn().mockReturnValue({
    toArray: () => [{ ...order, _id: order.id }],
  }),
} as never;

describe("Order mongo repository", () => {
  test("should return created order", async () => {
    const { sut } = makeSut();
    jest.spyOn(MongoHelper, "getCollection").mockReturnValueOnce(mockInsertOne);
    const response = await sut.create(Order.create(order));

    expect(response).toStrictEqual(order);
  });

  test("should return product stock", async () => {
    const { sut } = makeSut();
    jest.spyOn(MongoHelper, "getCollection").mockReturnValueOnce(mockInsertOne);
    const response = await sut.create(Order.create(order));

    expect(response).toStrictEqual(order);
  });

  test("should return stored orders", async () => {
    const { sut } = makeSut();
    jest.spyOn(MongoHelper, "getCollection").mockReturnValueOnce(mockFindAll);
    const response = await sut.findAll();

    expect(response).toStrictEqual([order]);
  });
});
